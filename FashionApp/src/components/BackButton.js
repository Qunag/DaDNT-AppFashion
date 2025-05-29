import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ color = 'black', size = 24, style, destination }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (destination) {
            // Điều hướng đến màn hình được chỉ định trong destination
            navigation.navigate(destination);
        } else {
            // Mặc định quay lại màn hình trước đó
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={[styles.backButton, style]} onPress={handlePress}>
            <Ionicons name="arrow-back" size={size} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        zIndex: 10,
    },
});

export default BackButton;