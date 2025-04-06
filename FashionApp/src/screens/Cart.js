import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import QuantitySelector from "../components/QuantitySelector";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CheckboxField from "../components/CheckBoxField";
import { getUserID } from '../services/authService';
import { fetchCart, createCart } from '../services/cartService';

export default function Cart() {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {
        try {
            const userID = await getUserID();
            const response = await fetchCart(userID);
            if (response && response.items && Array.isArray(response.items) && response.items.length === 0) {
                createCart(userID);
            } else {
                setCartItems(response.items || []);
            }
        } catch (error) {
            createCart(await getUserID());
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleCheckout = () => {
        if (isChecked) {
            navigation.navigate("Checkout", { cartItems });
        } else {
            alert("Please select products before checkout!");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>My Cart</Text>
            {loading ? <Text>Loading...</Text> : cartItems.length === 0 ? <Text>Your cart is empty!</Text> : cartItems.map((item, index) => (
                <View style={styles.itemBox} key={index}>
                    <CheckboxField label=" " value={isChecked} onValueChange={(value) => setIsChecked(value)} />
                    <Image source={{ uri: item.imageUri }} style={styles.image} />
                    <View style={styles.content}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.collection}>{item.collection}</Text>
                        <Text style={styles.price}>{item.price} VND</Text>
                        <View style={styles.quantityContainer}>
                            <QuantitySelector onChange={(value) => setQuantity(value)} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.closeButton}>
                        <Text>✕</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>GO TO CHECKOUT</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.checkoutPrice}>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
                </View>
            </TouchableOpacity>
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
});
