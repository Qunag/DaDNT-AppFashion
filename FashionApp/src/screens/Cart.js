import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import QuantitySelector from "../components/QuantitySelector";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CheckboxField from "../components/CheckBoxField";
import { getUserID } from '../services/authService';
import { fetchCart, createCart, updateCartItem, removeFromCart } from '../services/cartService';

export default function Cart() {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [loading, setLoading] = useState(true);


    const fetchCartItems = async () => {
        try {
            const userId = await getUserID();
            const cart = await fetchCart(userId);
            if (cart && cart.items) {
                const validCartItems = cart.items.map(item => ({
                    ...item
                }));
                setCartItems(validCartItems);
            } else {
                const newCart = await createCart(userId);
                setCartItems(newCart.items);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleQuantityChange = async (index, value) => {
        const item = cartItems[index];

        if (!item || !item.productId) {
            console.error("Không tìm thấy mục hợp lệ tại vị trí:", index);
            return;
        }

        // Trích xuất ID thực tế từ đối tượng sản phẩm
        const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;

        if (!productId) {
            console.error("Không thể tìm thấy ID sản phẩm trong:", item.productId);
            return;
        }

        console.log("Cập nhật mục với ID:", productId);
        console.log("Color:", item.color, "Size:", item.size);  // Log ra để kiểm tra

        try {
            // Đảm bảo color và size hợp lệ
            if (!item.color || !item.size) {
                throw new Error("Thiếu thông tin màu sắc hoặc kích thước");
            }

            // Gọi API để cập nhật số lượng sản phẩm
            await updateCartItem(productId, {
                quantity: value,
                color: item.color,
                size: item.size
            });

            // Cập nhật số lượng trong state
            const updatedItems = [...cartItems];
            updatedItems[index] = {
                ...updatedItems[index],
                quantity: value
            };
            setCartItems(updatedItems);
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error);
            Alert.alert(
                "Cập nhật thất bại",
                "Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại."
            );
        }
    };



    const handleRemove = async (index) => {
        const item = cartItems[index];

        if (!item.productId) {
            console.error("Không tìm thấy productId trong item:", item);
            return;
        }

        // Extract the actual ID from the product object
        const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;

        if (!productId) {
            console.error("Could not find product ID in:", item.productId);
            return;
        }

        try {
            // Call API to remove product from cart
            await removeFromCart(productId);

            // Update cart after removing product
            const updatedItems = cartItems.filter((_, i) => i !== index);
            setCartItems(updatedItems);
        } catch (error) {
            console.error("Error removing item:", error);
            Alert.alert(
                "Remove Failed",
                "Could not remove product from cart. Please try again."
            );
        }
    };



    const handleCheckboxChange = (index, value) => {
        setCheckedItems(prev => ({ ...prev, [index]: value }));
    };

    const handleCheckout = () => {
        const selectedItems = cartItems.filter((_, i) => checkedItems[i]);
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn sản phẩm để thanh toán!");
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
            <Text style={styles.header}>My Cart</Text>

            {loading ? (
                <Text>Loading...</Text>
            ) : cartItems.length === 0 ? (
                <Text>Your cart is empty!</Text>
            ) : (
                cartItems.map((item, index) => (
                    <View style={styles.itemBox} key={index}>
                        <CheckboxField
                            label=" "
                            value={!!checkedItems[index]}
                            onValueChange={(val) => handleCheckboxChange(index, val)}
                        />
                        <Image source={{ uri: item.image_url }} style={styles.image} />
                        <View style={styles.content}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.collection}>Màu: {item.color} | Size: {item.size}</Text>
                            <Text style={styles.price}>{item.price} VND</Text>
                            <View style={styles.quantityContainer}>
                                <QuantitySelector
                                    value={item.quantity}
                                    onChange={(value) => handleQuantityChange(index, value)}  // Gọi API khi thay đổi số lượng
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => handleRemove(index)}  // Gọi API khi xóa sản phẩm
                        >
                            <Text>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}

            {cartItems.length > 0 && (
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.checkoutPrice}>{getTotal().toLocaleString()} VND</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", backgroundColor: "#f8f8f8", padding: 10 },
    header: { fontSize: 20, marginTop: 50, marginBottom: 20 },
    itemBox: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 8, borderWidth: 2, width: "95%", position: "relative", marginTop: 30 },
    image: { width: 60, height: 60, borderRadius: 5 },
    content: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
    productName: { fontSize: 16, fontWeight: "bold", color: "#6342E8" },
    collection: { fontSize: 12, color: "gray", marginBottom: 8 },
    price: { fontSize: 15, fontWeight: "bold" },
    quantityContainer: { position: "absolute", bottom: 10, right: 5 },
    checkoutButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#6342E8", paddingVertical: 15, paddingHorizontal: 20, borderRadius: 50, position: "absolute", bottom: 20, width: "90%", alignSelf: "center" },
    checkoutText: { color: "white", fontSize: 18, fontWeight: "bold", marginRight: 10 },
    priceContainer: { backgroundColor: "#4b0082", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
    checkoutPrice: { color: "white", fontSize: 16, fontWeight: "bold" },
    backButton: { position: "absolute", left: 20, top: 40 },
    closeButton: { position: "absolute", top: 5, right: 5 },
});
