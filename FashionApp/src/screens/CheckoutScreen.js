import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutScreen({ visible, onClose }) {
    const navigator = useNavigation();
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>

                    <Text style={styles.header}>Checkout</Text>

                    <View style={styles.option}>
                        <Text style={styles.label}>Delivery</Text>
                        <TouchableOpacity>
                            <Text style={styles.actionText}>Select Method ▶</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.option}>
                        <Text style={styles.label}>Payment</Text>
                        <TouchableOpacity>
                            <Text style={styles.actionText}>💳 ▶</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.option}>
                        <Text style={styles.label}>Promo Code</Text>
                        <TouchableOpacity>
                            <Text style={styles.actionText}>Pick discount ▶</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.option}>
                        <Text style={styles.label}>Total Cost</Text>
                        <Text style={styles.totalCost}>$135.96 ▶</Text>
                    </View>

                    <Text style={styles.terms}>
                        By placing an order you agree to our Terms And Conditions.
                    </Text>

                    <TouchableOpacity
                        style={styles.placeOrderButton}
                        onPress={() => {
                            onClose();  // Đóng modal
                            setTimeout(() => navigator.navigate("Success"), 300); // Chuyển màn hình sau khi modal đóng
                        }}
                    >
                        <Text style={styles.placeOrderText}>PLACE ORDER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingBottom: 40,
    },
    closeButton: {
        position: "absolute",
        right: 20,
        top: 20,
    },
    closeText: {
        fontSize: 18,
        color: "gray",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    label: {
        fontSize: 16,
    },
    actionText: {
        color: "#6a1b9a",
        fontWeight: "bold",
    },
    totalCost: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6a1b9a",
    },
    terms: {
        fontSize: 12,
        color: "gray",
        textAlign: "center",
        marginTop: 10,
    },
    placeOrderButton: {
        backgroundColor: "#6a1b9a",
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
});
