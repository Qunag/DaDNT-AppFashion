import React from 'react';
import { View, Image, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/Button';



export default function SuccessScreen() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require('../assets/image2.png')} style={styles.image1} />
            <Text style={{ fontSize: 25, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 110 }}> Oh Snap! Order Failed</Text>
            <Text style={{ fontSize: 12, marginTop: 20, textAlign: 'center' }}> Looks like something went wrong {'\n'}while processing your request.</Text>
            <CustomButton title="PLEASE TRY AGAIN" type='fill' />
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
        zIndex: 10, // nut này luon lên trên cùng
    },
})
