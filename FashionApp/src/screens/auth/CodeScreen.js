// screens/OTPVerificationScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/CodeScreenStyles';
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/Button';
import { sendVerificationEmail, verifyEmail } from '../../services/authService';

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
            Alert.alert('Error', 'Email not provided.');
            return;
        }
        try {
            await sendVerificationEmail(email);
            Alert.alert('Thông báo', 'Mã OTP đã được gửi lại về email của bạn.');
            setTimer(60);
            setResendDisabled(true);
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
            console.log('Gửi lại mã OTP cho email:', email);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleCodeChange = (text, index) => {
        if (text && !/^[0-9]$/.test(text)) {
            return;
        }

        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        if (!text && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            Alert.alert('Error', 'Vui lòng nhập đủ 6 chữ số OTP.');
            return;
        }
        try {
            await verifyEmail(email, fullCode);
            Alert.alert('Success', 'Xác minh OTP thành công!', [
                { text: 'OK', onPress: () => navigation.navigate('ResetPasswordScreen') },
            ]);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <BackButton />
                <Text style={styles.title}>Xác thực mã OTP</Text>
                <Text style={styles.subtitle}>
                    Nhập mã xác thực được gửi đến {email || 'email của bạn'}.
                </Text>

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