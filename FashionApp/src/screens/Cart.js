import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import QuantitySelector from "../components/QuantitySelector";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CheckboxField from "../components/CheckBoxField";

export default function Cart() {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false); // State để theo dõi checkbox
    const [quantity, setQuantity] = useState(1); // State để theo dõi số lượng

    const product = {
        name: "Air Jordan 1 Low",
        collection: "Nike",
        price: 3600000,
        imageUri: "https://res.cloudinary.com/dgmy6mekk/image/upload/v1739805514/AirJordan1Low_Black.jpg",
        quantity: quantity,
    };

    const handleCheckout = () => {
        if (isChecked) {
            navigation.navigate("Checkout", { selectedProduct: product });
        } else {
            alert("Vui lòng chọn sản phẩm trước khi thanh toán!");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>My Cart</Text>
            <View style={styles.itemBox}>
                <CheckboxField
                    label=" " 
                    value={isChecked}
                    onValueChange={(value) => setIsChecked(value)}
                />

                <Image source={{ uri: product.imageUri }} style={styles.image} />

                <View style={styles.content}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.collection}>{product.collection}</Text>
                    <Text style={styles.price}>
                        {product.price}
                        <Text style={styles.currency}>VND</Text>
                    </Text>
                    <View style={styles.quantityContainer}>
                        <QuantitySelector onChange={(value) => setQuantity(value)} />
                    </View>
                </View>

                <TouchableOpacity style={styles.closeButton}>
                    <Text>✕</Text>
                </TouchableOpacity>
            </View>

            {/* Nút Checkout có chữ "GO TO CHECKOUT" */}
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.checkoutPrice}>{product.price * quantity}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    header: {
        fontSize: 20,
        marginTop: 50,
        marginBottom: 20,
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
    price: {
        fontSize: 15,
        fontWeight: "bold",
    },
    currency: {
        fontSize: 12,
        fontWeight: "normal",
        color: "gray",
    },
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10,
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
});