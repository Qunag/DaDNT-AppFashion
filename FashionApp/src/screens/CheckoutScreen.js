import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


export default function CheckoutScreen() {
    const navigation = useNavigation();

    const [deliveryMethod, setDeliveryMethod] = useState("Mặc định");
    const [paymentMethod, setPaymentMethod] = useState("MoMo");

    const deliveryOptions = ["Mặc định", "Chậm", "Hỏa tốc"];
    const paymentOptions = ["MoMo", "Thanh toán khi nhận hàng", "Thẻ tín dụng"];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Checkout</Text>
            <TouchableOpacity style={styles.view}>
                <Text style={styles.label}>Thông tin nhận hàng:</Text>
            </TouchableOpacity>
            <View style={styles.view}>
                <Text style={styles.label}>Mặt hàng:</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.label}>Chọn phương thức giao hàng:</Text>
                {deliveryOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[styles.option, deliveryMethod === option && styles.selectedOption]}
                        onPress={() => setDeliveryMethod(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                        {deliveryMethod === option && <Ionicons name="checkmark" size={20} color="#6342E8" />}
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
                <View style={styles.totalCostContainer}>
                    <Text style={styles.label}>Thanh toán</Text>
                    <Text style={styles.totalCost}>3,600,000₫</Text>
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
        width: "100%", // Chiều rộng tối đa
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
        marginTop: 10,
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
