// screens/OTPVerificationScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/CodeScreenStyles';
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/Button';
import { sendOtp, sendVerificationEmail, verifyEmail, verifyOtp } from '../../services/authService';

export default function OTPVerificationScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params || {};
    const [timer, setTimer] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    const handleResendOTP = async () => {
        if (!email) {
            Alert.alert('Lỗi', 'Không có email.');
            return;
        }
        try {
            await sendOtp(email);
            Alert.alert('Thông báo', 'Mã OTP đã được gửi lại về email của bạn.');
            setTimer(60);
            setResendDisabled(true);
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (error) {
            Alert.alert('Lỗi', error?.response?.data?.message || 'Gửi lại mã OTP thất bại.');
        }
    };

    const handleCodeChange = (text, index) => {
        if (text && !/^[0-9]$/.test(text)) return;

        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 5) inputRefs.current[index + 1]?.focus();
        if (!text && index > 0) inputRefs.current[index - 1]?.focus();
    };

    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ 6 chữ số OTP.');
            return;
        }

        try {
            await verifyOtp(email, fullCode); // gọi API xác minh OTP
            Alert.alert('Thành công', 'Xác minh OTP thành công!', [
                { text: 'OK', onPress: () => navigation.navigate('Login', { email }) },
            ]);
        } catch (error) {
            Alert.alert('Lỗi', error?.response?.data?.message || 'Xác minh OTP thất bại.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <BackButton />
                <Text style={styles.title}>Xác thực mã OTP</Text>
                <Text style={styles.subtitle}>Nhập mã xác thực được gửi đến {email || 'email của bạn'}.</Text>

                <View style={styles.otpContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={styles.otpBox}
                            maxLength={1}
                            keyboardType="numeric"
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
                                    inputRefs.current[index - 1].focus();
                                }
                            }}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={handleResendOTP} disabled={resendDisabled}>
                    <Text style={[styles.resendText, resendDisabled && styles.resendDisabled]}>
                        Gửi lại mã
                    </Text>
                    {resendDisabled && <Text style={styles.timerText}>({timer} giây)</Text>}
                </TouchableOpacity>

                <CustomButton title="Verify" type="fill" onPress={handleVerify} />
            </View>
        </TouchableWithoutFeedback>
    );
}
