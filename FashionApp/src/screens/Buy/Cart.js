import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import QuantitySelector from "../../components/QuantitySelector";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CheckboxField from "../../components/CheckBoxField";
import { getUserID } from '../../services/authService';
import { fetchCart, createCart, updateCartItem, removeFromCart } from '../../services/cartService';
import { getProductDetail } from '../../services/productService'; // Thêm import để lấy chi tiết sản phẩm
import Toast from 'react-native-toast-message';

export default function Cart() {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {
        try {
            const userId = await getUserID();
            const cart = await fetchCart(userId);
            let validCartItems = [];

            if (cart && cart.items) {

                validCartItems = await Promise.all(
                    cart.items.map(async (item) => {
                        const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;
                        try {
                            // Gọi API để lấy chi tiết sản phẩm và stockQuantity
                            const productDetails = await getProductDetail(productId);
                            const selectedColor = productDetails.colors.find(
                                (color) => color.color_name === item.color
                            );
                            const selectedSize = selectedColor?.sizes.find(
                                (size) => size.size === item.size
                            );

                            return {
                                ...item,
                                productId: { id: productId },
                                stockQuantity: selectedSize?.quantity || 0, // Cập nhật stockQuantity từ API
                            };
                        } catch (error) {
                            console.error(`Lỗi khi lấy chi tiết sản phẩm ${productId}:`, error);
                            return {
                                ...item,
                                productId: { id: productId },
                                stockQuantity: 0, // Nếu lỗi, đặt stockQuantity là 0
                            };
                        }
                    })
                );
                setCartItems(validCartItems);
            } else {
                const newCart = await createCart(userId);
                setCartItems(newCart.items);
            }
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            const userId = await getUserID();
            const newCart = await createCart(userId);
            setCartItems(newCart.items);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (index, value) => {
        const item = cartItems[index];

        if (!item || !item.productId) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Thông tin sản phẩm không hợp lệ',
                position: 'top',
                visibilityTime: 2000,
            });
            return;
        }

        const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;

        if (!productId || !item.color || !item.size) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Thiếu thông tin sản phẩm',
                position: 'top',
                visibilityTime: 2000,
            });
            return;
        }

        if (value === 0) {
            handleRemove(index);
            return;
        }

        // Kiểm tra stockQuantity từ API
        try {
            const productDetails = await getProductDetail(productId);

            const selectedColor = productDetails.colors.find(
                (color) => color.color_name == item.color
            );

            const selectedSize = selectedColor?.sizes.find(
                (size) => size.size == item.size
            );


            const stockQuantity = selectedSize?.quantity || 0;
            // Kiểm tra số lượng trong kho
            if (value > stockQuantity) {
                Toast.show({
                    type: 'error',
                    text1: 'Số lượng không đủ',
                    text2: `Chỉ còn ${stockQuantity} sản phẩm trong kho`,
                    position: 'top',
                    visibilityTime: 2000,
                });
                return;
            }

            // Cập nhật số lượng nếu hợp lệ
            await updateCartItem(productId, {
                quantity: value,
                color: item.color,
                size: item.size,
            });

            // Cập nhật giỏ hàng
            const updatedItems = [...cartItems];
            updatedItems[index] = { ...updatedItems[index], quantity: value, stockQuantity };
            setCartItems(updatedItems);

            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Cập nhật số lượng thành công',
                position: 'top',
                visibilityTime: 2000,
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error);
            Toast.show({
                type: 'error',
                text1: 'Cập nhật thất bại',
                text2: 'Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại.',
                position: 'top',
                visibilityTime: 2000,
            });
        }
    };


    const handleRemove = async (index) => {
        const item = cartItems[index];
        if (!item || !item.productId) return;

        Alert.alert(
            "Xác nhận",
            "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?",
            [
                { text: "Không", style: "cancel" },
                {
                    text: "Có",
                    onPress: async () => {
                        const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;
                        if (!productId || !item.color || !item.size) {
                            Toast.show({
                                type: 'error',
                                text1: 'Lỗi',
                                text2: 'Không thể xóa sản phẩm do thiếu thông tin.',
                                position: 'top',
                                visibilityTime: 2000,
                            });
                            return;
                        }
                        try {
                            await removeFromCart(productId, item.color, item.size);
                            const updatedItems = cartItems.filter((_, i) => i !== index);
                            setCartItems(updatedItems);
                            setCheckedItems(prev => {
                                const newChecked = { ...prev };
                                delete newChecked[index];
                                return newChecked;
                            });

                            Toast.show({
                                type: 'success',
                                text1: 'Thành công',
                                text2: 'Đã xóa sản phẩm khỏi giỏ hàng',
                                position: 'top',
                                visibilityTime: 2000,
                            });
                        } catch (error) {
                            console.error("Lỗi khi xóa sản phẩm:", error);
                            Toast.show({
                                type: 'error',
                                text1: 'Xóa thất bại',
                                text2: 'Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.',
                                position: 'top',
                                visibilityTime: 2000,
                            });
                        }
                    }
                }
            ]
        );
    };

    const handleCheckboxChange = (index, value) => {
        setCheckedItems(prev => ({ ...prev, [index]: value }));
    };

    const handleCheckout = () => {
        const selectedItems = cartItems.filter((_, i) => checkedItems[i]);

        if (selectedItems.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui lòng chọn sản phẩm để thanh toán!',
                position: 'top',
                visibilityTime: 2000,
            });
        } else {
            navigation.navigate("Checkout", { cartItems: selectedItems });
        }
    };

    const getTotal = () => {
        return cartItems.reduce((sum, item, i) => {
            if (checkedItems[i]) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Giỏ hàng</Text>

            {loading ? (
                <Text>Đang tải...</Text>
            ) : cartItems.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Giỏ hàng trống!</Text>
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {cartItems.map((item, index) => (
                        <View style={styles.itemBox} key={`${item.productId.id}_${item.color}_${item.size}`}>
                            <CheckboxField
                                label=" "
                                value={!!checkedItems[index]}
                                onValueChange={(val) => handleCheckboxChange(index, val)}
                            />
                            <Image source={{ uri: item.image_url }} style={styles.image} />
                            <View style={styles.content}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <View style={styles.colorContainer}>
                                    <Text style={styles.collection}>Màu: </Text>
                                    <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                </View>
                                <Text style={styles.collection}>Size: {item.size}</Text>
                                <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
                                <View style={styles.quantityContainer}>
                                    <QuantitySelector
                                        value={item.quantity}
                                        onChange={(value) => handleQuantityChange(index, value)}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={() => handleRemove(index)}>
                                <Text>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}

            {cartItems.length > 0 && (
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutText}>Thanh Toán</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.checkoutPrice}>{getTotal().toLocaleString()} VND</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    scrollView: {
        width: '100%',
        marginBottom: 80,
    },
    header: {
        fontSize: 20,
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
    },
    itemBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        width: "95%",
        position: "relative",
        marginTop: 30,
        alignSelf: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    content: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between",
    },
    colorBox: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6342E8",
    },
    collection: {
        fontSize: 12,
        color: "gray",
        marginBottom: 8,
    },
    colorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
    },
    quantityContainer: {
        position: "absolute",
        bottom: 10,
        right: 5,
    },
    checkoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6342E8",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        position: "absolute",
        bottom: 20,
        width: "90%",
        alignSelf: "center",
    },
    checkoutText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },
    priceContainer: {
        backgroundColor: "#4b0082",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    checkoutPrice: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 5,
    },
});