import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import InputField from '../components/InputField'; 
import styles from '../styles/ForgotStyles';
import CustomButton from '../components/Button';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    // Hàm kiểm tra định dạng email hợp lệ
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Hàm xử lý gửi OTP
    const handleSendOTP = async () => {
        if (!email) {
            Alert.alert('Error', 'Vui lòng nhập email');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Email không hợp lệ. Vui lòng nhập đúng định dạng.');
            return;
        }

        try {
            // Giả lập gửi OTP (thay bằng API thực tế nếu có)
            Alert.alert('Thành công', 'Mã OTP đã được gửi về email của bạn');
            navigation.navigate('CodeScreen', { email }); 
        } catch (error) {
            console.error('Error sending OTP:', error);
            Alert.alert('Error', 'Không thể gửi OTP. Vui lòng thử lại sau.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <BackButton /> {/* Sử dụng component BackButton */}
                <View style={styles.content}>
                    <Text style={styles.title}>Forgot password</Text>
                    <Text style={styles.subtitle}>Enter email to receive OTP code</Text>

                    
                    <InputField
                        // label="Email"
                        icon="mail-outline"
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <CustomButton title="Send OTP" onPress={handleSendOTP} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}