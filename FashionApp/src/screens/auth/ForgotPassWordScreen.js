import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import { forgotPassword } from '../../services/authService';
// import styles from '../../styles/ForgotPasswordStyles';
import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import BackButton from '../../components/BackButton';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter a valid email.');
            return;
        }

        try {
            await forgotPassword(email);
            Alert.alert('Success', 'A new password has been sent to your email. Please check your inbox.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to reset password. Please try again.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/anh2.png')} style={styles.topSection}>
                <BackButton/>
                <View style={styles.overlay} />
                <Text style={styles.welcomeText}>Quên mật khẩu</Text>
            </ImageBackground>

            <View style={styles.bottomSection}>
                <Text style={styles.instructionText}>
                    Vui lòng nhập email để nhận mật khẩu mới.
                </Text>
                <InputField
                    label="Nhập Email"
                    icon="mail-outline"
                    placeholder="Nhập email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <AuthButton title="Gửi mật khẩu mới" onPress={handleForgotPassword} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signupText}>Quay lại Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    topSection: { flex: 1.2, justifyContent: 'center', alignItems: 'center', width: '100%' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
    backButton: { position: 'absolute', top: 40, left: 10, zIndex: 10, padding: 10 },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: COLORS.white, textAlign: 'center' },
    bottomSection: {
        flex: 1.8,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: SIZES.padding,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 10,
    },
    instructionText: { fontSize: SIZES.font, marginBottom: 20, textAlign: 'center' },
    signupText: { color: COLORS.primary, fontWeight: 'bold', marginTop: 15 },
});

