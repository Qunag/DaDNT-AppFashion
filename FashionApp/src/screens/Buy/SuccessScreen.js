import React from 'react';
import { View, Image, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/Button';
import { useNavigation, useRoute } from "@react-navigation/native";


export default function SuccessScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        cartItems,
        deliveryMethod,
        paymentMethod,
        deliveryCost,
        itemsTotal,
        total,
        userData,
    } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require('../../assets/image1.png')} style={styles.image1} />
            <Text style={{ fontSize: 30, color: '#6342E8', textAlign: 'center', fontWeight: 'bold', marginTop: 30 }}>Thank You</Text>
            <Text style={{ fontSize: 25, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>Bạn đã đặt hàng thành công!</Text>
            <Text style={{ fontSize: 12, marginTop: 10, textAlign: 'center' }}> Đơn hàng của bạn đang được xử lý {'\n'} và sẽ đến tay bạn trong vài ngày tới</Text>
            <View>
                <CustomButton
                    onPress={() =>
                        navigation.navigate("Order", {
                            cartItems,
                            deliveryMethod,
                            paymentMethod,
                            deliveryCost,
                            itemsTotal,
                            total,
                            userData,
                        })
                    }
                    title="Theo dõi đơn hàng" type='fill'
                />
                <CustomButton
                    onPress={() => navigation.navigate('Home')}
                    title="Tiếp tục mua hàng" type='fill' />

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        width: 116,
        height: 116,
        top: 5,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },

})
