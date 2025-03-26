import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ color = 'black', size = 24, style }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={[styles.backButton, style]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={size} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40, // Điều chỉnh vị trí nút
        left: 20, // Căn lề trái
        padding: 10, // Thêm vùng bấm dễ dàng hơn
        zIndex: 10, // Đảm bảo hiển thị trên cùng
    },
});

export default BackButton;
