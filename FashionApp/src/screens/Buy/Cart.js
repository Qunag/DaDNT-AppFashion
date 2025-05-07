import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import QuantitySelector from "../../components/QuantitySelector";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CheckboxField from "../../components/CheckBoxField";
import { getUserID } from '../../services/authService';
import { fetchCart, createCart, updateCartItem, removeFromCart } from '../../services/cartService';
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
            if (cart && cart.items) {
                const validCartItems = cart.items.map(item => ({
                    ...item,
                    productId: typeof item.productId === 'object' ? item.productId : { id: item.productId },
                }));
                setCartItems(validCartItems);
            } else {
                const newCart = await createCart(userId);
                setCartItems(newCart.items);
            }
        } catch (error) {

            const newCart = await createCart(userId);
            setCartItems(newCart.items);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (index, value) => {
        const item = cartItems[index];
        if (!item || !item.productId) return;

        const productId = typeof item.productId === 'object' ? item.productId.id : item.productId;

        if (!productId || !item.color || !item.size) {
            console.error("Thiếu thông tin cần thiết.");
            return;
        }

        if (value === 0) {
            handleRemove(index)
            return;
        }

        if (value > item.stockQuantity) {
            Toast.show({
                type: 'error',
                text1: 'Số lượng trong kho không đủ',
                text2: `Chỉ còn ${item.stockQuantity} sản phẩm`,
                position: 'top'
            });
            return;
        }

        try {
            await updateCartItem(productId, {
                quantity: value,
                color: item.color,
                size: item.size,
            });

            const updatedItems = [...cartItems];
            updatedItems[index] = { ...updatedItems[index], quantity: value };
            setCartItems(updatedItems);
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error);
            Alert.alert("Cập nhật thất bại", "Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại.");
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
                            Alert.alert("Lỗi", "Không thể xóa sản phẩm do thiếu thông tin.");
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
                                text1: 'Đã xóa sản phẩm khỏi giỏ hàng',
                                position: 'top',
                                visibilityTime: 2000,
                            });

                        } catch (error) {
                            console.error("Error removing item:", error);
                            Alert.alert("Xóa thất bại", "Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.");
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
            <Text style={styles.header}>Giỏ hàng</Text>

            {loading ? (
                <Text>Loading...</Text>
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