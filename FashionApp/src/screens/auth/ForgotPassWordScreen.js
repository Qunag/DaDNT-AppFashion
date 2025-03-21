import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import { forgotPassword } from '../services/authService';
import styles from '../styles/ForgotPasswordStyles';
import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleForgotPassword = async () => {
        try {
            await forgotPassword(email);
            Alert.alert('Success', 'A password reset link has been sent to your email.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to send reset link. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.overlay} />
                <Text style={styles.welcomeText}>Forgot Password</Text>
            </ImageBackground>

            <View style={styles.bottomSection}>
                <Text style={styles.instructionText}>
                    Enter your email to receive a password reset link.
                </Text>
                <InputField
                    label="Email address"
                    icon="mail-outline"
                    placeholder="Enter email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <AuthButton title="SEND RESET LINK" onPress={handleForgotPassword} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signupText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
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


