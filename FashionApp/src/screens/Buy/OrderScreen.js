import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OrderScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        userData,
        cartItems,
        deliveryMethod,
        paymentMethod,
        deliveryCost,
        itemsTotal,
        total
    } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.header}>Đơn hàng</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin nhận hàng</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="person-outline" size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{userData.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{userData.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color="#6B7280" />
                    <Text style={styles.infoText}>{userData.address}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
                <Text style={styles.text}>{deliveryMethod} ({deliveryCost.toLocaleString()} VND)</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                <Text style={styles.text}>{paymentMethod}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mặt hàng</Text>
                {cartItems.map((item, index) => (
                    <View style={styles.itemBox} key={index}>
                        <Image source={{ uri: item.image_url }} style={styles.image} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.text}>Màu: {item.color_name} | Size: {item.size}</Text>
                            <Text style={styles.text}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thanh toán</Text>
                <Text style={styles.text}>Tiền hàng: {itemsTotal.toLocaleString()} VND</Text>
                <Text style={styles.text}>Phí giao hàng: {deliveryCost.toLocaleString()} VND</Text>
                <Text style={styles.total}>Tổng cộng: {total.toLocaleString()} VND</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    infoText: {
        fontSize: 14,
        color: "#000",
        marginLeft: 10,
    },
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        paddingTop: 60,
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
    },
    itemBox: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#6342E8',
    },
    price: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#6342E8',
    },
});
