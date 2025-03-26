import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CodeScreenStyles';
import BackButton from '../components/BackButton';
import CustomButton from '../components/Button'; 

export default function OTPVerificationScreen() {
    const navigation = useNavigation();
    const [timer, setTimer] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);

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

    const handleResendOTP = () => {
        Alert.alert('Thông báo', 'Mã OTP đã được gửi lại về email của bạn.');
        setTimer(60);
        setResendDisabled(true);
        console.log('Gửi lại mã OTP');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <BackButton />
                <Text style={styles.title}>Xác thực mã OTP</Text>
                <Text style={styles.subtitle}>Nhập mã xác thực được gửi đến email của bạn.</Text>

                <OTPInputView
                    style={styles.otpContainer}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.otpBox}
                    codeInputHighlightStyle={styles.otpBoxActive}
                    onCodeFilled={(code) => {
                        console.log(`OTP nhập vào: ${code}`);
                        navigation.navigate('ResetPasswordScreen');
                    }}
                />

                <TouchableOpacity onPress={handleResendOTP} disabled={resendDisabled}>
                    <Text style={[styles.resendText, resendDisabled && styles.resendDisabled]}>
                        Gửi lại mã
                    </Text>
                    {resendDisabled && <Text style={styles.timerText}>({timer} giây)</Text>}
                </TouchableOpacity>

                <CustomButton title="Verify" type="fill" onPress={() => navigation.push('ResetPasswordScreen')} />
            </View>
        </TouchableWithoutFeedback>
        
    );
}
