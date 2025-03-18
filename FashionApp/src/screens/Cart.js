import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import QuantitySelector from "../components/QuantitySelector";
import CheckoutScreen from "./CheckoutScreen";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


export default function Cart() {
    const navigation = useNavigation();
    const [checkoutVisible, setCheckoutVisible] = useState(false); // Trạng thái hiển thị Checkout

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>My Cart</Text>
            <View style={styles.itemBox}>
                {/* Hình ảnh sản phẩm */}
                <Image
                    source={{
                        uri: "https://neonize.gumlet.io/wp-content/uploads/2022/08/Valorant-Logo-Neon-Light-Sign-Neonize.jpg",
                    }}
                    style={styles.image}
                />

                <View style={styles.content}>
                    <Text style={styles.productName}>Printed Shirt</Text>
                    <Text style={styles.collection}>GEETA COLLECTION</Text>
                    <Text style={styles.price}>$28.00 <Text style={styles.currency}>USD</Text></Text>
                    <View style={styles.quantityContainer}>
                        <QuantitySelector onChange={(value) => console.log("Số lượng:", value)} />
                    </View>
                </View>

                <TouchableOpacity style={styles.closeButton}>
                    <Text>✕</Text>
                </TouchableOpacity>
            </View>

            {/* Nút chuyển sang Checkout */}
            <TouchableOpacity style={styles.checkoutButton} onPress={() => setCheckoutVisible(true)}>
                <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.checkoutPrice}>$135.96</Text>
                </View>
            </TouchableOpacity>

            {/* Màn hình Checkout */}
            <CheckoutScreen visible={checkoutVisible} onClose={() => setCheckoutVisible(false)} />
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
        margin: 20,
    },
    itemBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: "90%",
        position: "relative",
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
        color: "#6a1b9a",
    },
    collection: {
        fontSize: 12,
        color: "gray",
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
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
        right: 10,
    },
    checkoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6a1b9a",
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
