import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectionModal from "../components/SelectionModal";

export default function CheckoutScreen({ visible, onClose }) {
    const navigation = useNavigation();

    const [deliveryMethod, setDeliveryMethod] = useState("Chọn");
    const [paymentMethod, setPaymentMethod] = useState("Chọn");
    const [promoCode, setPromoCode] = useState("Chọn");

    const [modalVisible, setModalVisible] = useState(false);
    const [modalOptions, setModalOptions] = useState([]);
    const [onSelectOption, setOnSelectOption] = useState(() => () => { });

    const openModal = (options, onSelect) => {
        setModalOptions(options);
        setOnSelectOption(() => onSelect);
        setModalVisible(true);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>

                    <Text style={styles.header}>Checkout</Text>

                    {/* Delivery Option */}
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => openModal(["Mặc định", "Chậm", "Hỏa tốc"], setDeliveryMethod)}
                    >
                        <Text style={styles.label}>Phương thức giao hàng</Text>
                        <Text style={styles.actionText}>{deliveryMethod}</Text>
                    </TouchableOpacity>

                    {/* Payment Option */}
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => openModal(["MoMo", "Thanh toán khi nhận hàng", "Thẻ tín dụng"], setPaymentMethod)}
                    >
                        <Text style={styles.label}>Phương thức Thanh Toán</Text>
                        <Text style={styles.actionText}>{paymentMethod}</Text>
                    </TouchableOpacity>

                    {/* Promo Code */}
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => openModal(["Giảm 10%", "Giảm 20%", "Miễn phí ship"], setPromoCode)}
                    >
                        <Text style={styles.label}>Mã giảm giá</Text>
                        <Text style={styles.actionText}>{promoCode}</Text>
                    </TouchableOpacity>

                    {/* Total Cost */}
                    <View style={styles.totalCostContainer}>
                        <Text style={styles.label}>Thanh toán</Text>
                        <Text style={styles.totalCost}>3,600,000₫</Text>
                    </View>

                    <Text style={styles.terms}>
                        Bằng cách đặt hàng, bạn đồng ý với Điều khoản và Điều kiện của chúng tôi.
                    </Text>

                    <TouchableOpacity
                        style={styles.placeOrderButton}
                        onPress={() => {
                            onClose();
                            setTimeout(() => navigation.navigate("Success"), 300);
                        }}
                    >
                        <Text style={styles.placeOrderText}>ĐẶT HÀNG</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SelectionModal
                visible={modalVisible}
                options={modalOptions}
                onSelect={onSelectOption}
                onClose={() => setModalVisible(false)}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: "#6342E8",
    },
    closeButton: {
        position: "absolute",
        right: 15,
        top: 15,
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
        borderWidth: 1,
        borderColor: "#6342E8",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
    },
    actionText: {
        color: "#6342E8",
        fontWeight: "bold",
    },
    totalCostContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    totalCost: {
        fontSize: 16,
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
});