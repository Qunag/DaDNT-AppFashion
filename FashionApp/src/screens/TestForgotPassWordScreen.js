// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import styles from '../styles/LoginStyles';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:300/v1/auth/forgot-password', { email });
            Alert.alert('Success', 'A password reset link has been sent to your email.');
            navigation.navigate('TestLoginScreen');
        } catch (error) {
            console.error('Forgot password error:', error);
            Alert.alert('Error', 'Failed to send reset link. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Nửa trên */}
            <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.overlay} />
                <Text style={styles.welcomeText}>Forgot Password</Text>
            </ImageBackground>

            {/* Nửa dưới */}
            <View style={styles.bottomSection}>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>
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

                <TouchableOpacity onPress={() => navigation.navigate('TestLoginScreen')}>
                    <Text style={styles.signupText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}