import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../../services/userService';
import { useFocusEffect } from '@react-navigation/native';
import { createOrder } from '../../services/orderService';
import { removeFromCart } from '../../services/cartService';
import styles from '../../styles/Buy/CheckoutStyles';

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const { cartItems } = route.params || { cartItems: [] };
    const [deliveryMethod, setDeliveryMethod] = useState("Mặc định");
    const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUserInfoComplete, setIsUserInfoComplete] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);


    const colorMap = {
        '#CC0000': 'Đỏ',
        '#000000': 'Đen',
        '#FFFFFF': 'Trắng',
    };

    const deliveryOptions = [
        { name: "Mặc định", cost: 30000 },
        { name: "Tiết kiệm", cost: 20000 },
        { name: "Hỏa tốc", cost: 50000 },
    ];

    const paymentOptions = ["MoMo", "Thanh toán khi nhận hàng", "Thẻ tín dụng"];

    useFocusEffect(
        useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const accessToken = await AsyncStorage.getItem('accessToken');
                    if (!accessToken) {
                        console.warn('Không tìm thấy accessToken');
                        navigation.replace('LoginScreen');
                        return;
                    }

                    const decodedToken = jwtDecode(accessToken);
                    const userId = decodedToken.sub || decodedToken.userId || decodedToken.id || decodedToken.user;

                    if (!userId) {
                        throw new Error('Không tìm thấy userId trong token');
                    }

                    const response = await getUserById(userId);
                    setUserData(response);
                    setIsUserInfoComplete(!!response.phone && !!response.address);
                    setLoading(false);
                } catch (error) {
                    console.error('Lỗi khi lấy thông tin người dùng:', error.message || error);
                    setLoading(false);
                }
            };

            fetchUserData();
        }, [navigation])
    );

    const getItemsTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const getDeliveryCost = () => {
        const selectedOption = deliveryOptions.find(option => option.name === deliveryMethod);
        return selectedOption ? selectedOption.cost : 0;
    };

    const getTotal = () => {
        return getItemsTotal() + getDeliveryCost();
    };

    const handlePlaceOrder = async () => {
        if (!userData) {
            Alert.alert("Lỗi", "Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.");
            return;
        }

        if (!isUserInfoComplete) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ số điện thoại và địa chỉ.");
            return;
        }

        if (cartItems.length === 0) {
            Alert.alert("Lỗi", "Không có sản phẩm nào được chọn để đặt hàng.");
            return;
        }

        setPlacingOrder(true); // Bắt đầu hiển thị spinner

        try {
            const orderItems = cartItems.map(item => {
                const colorObj = item.productId.colors ? item.productId.colors.find(c => c.code === item.color) : null;
                const colorName = colorObj ? colorObj.name : item.color;

                return {
                    productId: typeof item.productId === 'object' ? item.productId.id : item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color_name: colorName,
                    image_url: item.image_url,
                    size: item.size,
                };
            });

            const response = await createOrder(orderItems);

            for (const item of cartItems) {
                try {
                    const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;
                    await removeFromCart(productId, item.color, item.size);
                } catch (error) {
                    console.warn(`Không thể xóa sản phẩm ${item.name} khỏi giỏ hàng: ${error.message}`);
                }
            }

            setPlacingOrder(false); // Tắt spinner trước khi chuyển màn
            navigation.navigate("Success", {
                cartItems: orderItems,
                deliveryMethod,
                paymentMethod,
                deliveryCost: getDeliveryCost(),
                itemsTotal: getItemsTotal(),
                total: getTotal(),
                userData,
                orderId: response._id,
            });

        } catch (error) {
            setPlacingOrder(false); // Tắt spinner nếu có lỗi
            console.error("Error creating order:", error.response ? error.response.data : error.message);
            Alert.alert("Lỗi", "Không thể tạo đơn hàng. Vui lòng thử lại.");
        }
    };


    if (loading || placingOrder) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ marginBottom: 10 }}>Đang xử lý đơn hàng...</Text>
                <ActivityIndicator size="large" color="#6342E8" />
            </View>
        );
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Thanh Toán</Text>

            <View style={styles.view}>
                <Text style={styles.label}>Thông tin nhận hàng:</Text>
                {userData ? (
                    <View>
                        <View style={styles.infoRow}>
                            <Ionicons name="person-outline" size={20} color="#6B7280" />
                            <Text style={styles.infoText}>{userData.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={20} color="#6B7280" />
                            <Text style={styles.infoText}>
                                {userData.phone ? userData.phone : "Vui lòng nhập số điện thoại"}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={20} color="#6B7280" />
                            <Text style={styles.infoText}>
                                {userData.address ? userData.address : "Vui lòng nhập địa chỉ"}
                            </Text>
                        </View>
                        {!isUserInfoComplete && (
                            <Text style={styles.errorText}>
                                Vui lòng nhập đầy đủ số điện thoại và địa chỉ để tiếp tục thanh toán.
                            </Text>
                        )}
                    </View>
                ) : (
                    <Text style={styles.placeholderText}>Không thể lấy thông tin người dùng</Text>
                )}
            </View>

            <View style={styles.view}>
                <Text style={styles.label}>Mặt hàng:</Text>
                {cartItems.length === 0 ? (
                    <Text style={styles.placeholderText}>Không có mặt hàng nào được chọn</Text>
                ) : (
                    cartItems.map((item, index) => (
                        <View style={styles.itemBox} key={`${item.productId.id}_${item.color}_${item.size}`}>
                            <Image source={{ uri: item.image_url }} style={styles.image} />
                            <View style={styles.content}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.collection}>
                                    Màu: {item.productId.colors?.find(c => c.code === item.color)?.name || colorMap[item.color] || item.color} | Size: {item.size}
                                </Text>
                                <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
                                <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>

            <View style={styles.view}>
                <Text style={styles.label}>Chọn phương thức giao hàng:</Text>
                {deliveryOptions.map((option) => (
                    <TouchableOpacity
                        key={option.name}
                        style={[styles.option, deliveryMethod === option.name && styles.selectedOption]}
                        onPress={() => setDeliveryMethod(option.name)}
                    >
                        <Text style={styles.optionText}>{option.name}</Text>
                        <Text style={styles.optionCost}>{option.cost.toLocaleString()} VND</Text>
                        {deliveryMethod === option.name && <Ionicons name="checkmark" size={20} color="#6342E8" />}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.view}>
                <Text style={styles.label}>Chọn phương thức thanh toán:</Text>
                {paymentOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[styles.option, paymentMethod === option && styles.selectedOption]}
                        onPress={() => setPaymentMethod(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                        {paymentMethod === option && <Ionicons name="checkmark" size={20} color="#6342E8" />}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.view}>
                <View style={styles.costBreakdown}>
                    <Text style={styles.costDetail}>Tổng tiền hàng: {getItemsTotal().toLocaleString()} VND</Text>
                    <Text style={styles.costDetail}>Phí giao hàng: {getDeliveryCost().toLocaleString()} VND</Text>
                </View>
                <View style={styles.totalCostContainer}>
                    <Text style={styles.label}>Thanh toán</Text>
                    <Text style={styles.totalCost}>{getTotal().toLocaleString()} VND</Text>
                </View>

                <Text style={styles.terms}>
                    Bằng cách đặt hàng, bạn đồng ý với Điều khoản và Điều kiện của chúng tôi.
                </Text>

                <TouchableOpacity
                    style={[styles.placeOrderButton, !isUserInfoComplete && styles.disabledButton]}
                    onPress={handlePlaceOrder}
                    disabled={!isUserInfoComplete}
                >
                    <Text style={styles.placeOrderText}>ĐẶT HÀNG</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

