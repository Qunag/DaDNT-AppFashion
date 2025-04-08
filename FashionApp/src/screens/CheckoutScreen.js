import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // Lấy danh sách mặt hàng từ màn hình Cart
    const { cartItems } = route.params || { cartItems: [] };

    const [deliveryMethod, setDeliveryMethod] = useState("Mặc định");
    const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");

    // Danh sách phương thức giao hàng với giá tiền
    const deliveryOptions = [
        { name: "Mặc định", cost: 30000 },
        { name: "Tiết kiệm", cost: 20000 },
        { name: "Hỏa tốc", cost: 50000 },
    ];

    const paymentOptions = ["MoMo", "Thanh toán khi nhận hàng", "Thẻ tín dụng"];

    // Hàm tính tổng tiền của mặt hàng
    const getItemsTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    // Hàm lấy phí giao hàng dựa trên phương thức được chọn
    const getDeliveryCost = () => {
        const selectedOption = deliveryOptions.find(option => option.name === deliveryMethod);
        return selectedOption ? selectedOption.cost : 0;
    };

    // Tổng tiền cuối cùng = tiền mặt hàng + phí giao hàng
    const getTotal = () => {
        return getItemsTotal() + getDeliveryCost();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Checkout</Text>

            {/* Phần thông tin nhận hàng */}
            <View style={styles.view}>
                <Text style={styles.label}>Thông tin nhận hàng:</Text>
                <Text style={styles.placeholderText}>Vui lòng thêm thông tin giao hàng</Text>
            </View>

            {/* Phần mặt hàng */}
            <View style={styles.view}>
                <Text style={styles.label}>Mặt hàng:</Text>
                {cartItems.length === 0 ? (
                    <Text style={styles.placeholderText}>Không có mặt hàng nào được chọn</Text>
                ) : (
                    cartItems.map((item, index) => (
                        <View style={styles.itemBox} key={index}>
                            <Image source={{ uri: item.image_url }} style={styles.image} />
                            <View style={styles.content}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.collection}>Màu: {item.color} | Size: {item.size}</Text>
                                <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
                                <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>

            {/* Phần chọn phương thức giao hàng */}
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

            {/* Phần chọn phương thức thanh toán */}
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

            {/* Phần thanh toán */}
            <View style={styles.view}>
                <View style={styles.totalCostContainer}>
                    <Text style={styles.label}>Thanh toán</Text>
                    <Text style={styles.totalCost}>{getTotal().toLocaleString()} VND</Text>
                </View>
                <View style={styles.costBreakdown}>
                    <Text style={styles.costDetail}>Tổng tiền hàng: {getItemsTotal().toLocaleString()} VND</Text>
                    <Text style={styles.costDetail}>Phí giao hàng: {getDeliveryCost().toLocaleString()} VND</Text>
                </View>

                <Text style={styles.terms}>
                    Bằng cách đặt hàng, bạn đồng ý với Điều khoản và Điều kiện của chúng tôi.
                </Text>

                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={() => navigation.navigate("Success")}
                >
                    <Text style={styles.placeOrderText}>ĐẶT HÀNG</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "#ecf0f1",
    },
    view: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        width: "100%",
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 50,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    placeholderText: {
        fontSize: 14,
        color: "gray",
    },
    itemBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6342E8",
    },
    collection: {
        fontSize: 12,
        color: "gray",
        marginVertical: 2,
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 14,
        color: "gray",
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#6342E8",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        alignItems: "center",
    },
    selectedOption: {
        backgroundColor: "#EDE7FF",
        borderColor: "#6342E8",
    },
    optionText: {
        fontSize: 16,
        flex: 1, 
    },
    optionCost: {
        fontSize: 14,
        color: "#6342E8",
        marginRight: 10, 
    },
    totalCostContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    totalCost: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6342E8",
    },
    costBreakdown: {
        marginTop: 10,
    },
    costDetail: {
        fontSize: 14,
        color: "gray",
    },
    terms: {
        fontSize: 12,
        color: "gray",
        textAlign: "center",
        marginTop: 10,
    },
    placeOrderButton: {
        backgroundColor: "#6342E8",
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 20,
    },
    placeOrderText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
});