import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InputField from '../components/InputField'; // Giả sử đã có
import CheckboxField from '../components/CheckBoxField'; // Giả sử đã có
import AuthButton from '../components/AuthButton'; // Giả sử đã có
import styles from '../styles/LoginStyles'; // Giả sử đã có, có thể cần điều chỉnh

export default function TestLoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/v1/auth/login', { email, password });
            Alert.alert('Login Successful', 'You have successfully logged in.');
            navigation.navigate('TestHomeScreen');
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', 'Invalid email or password.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Nửa trên với ImageBackground */}
            <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.overlay} />
                <Text style={styles.welcomeText}>Welcome Back!</Text>
            </ImageBackground>

            {/* Nửa dưới với form đăng nhập */}
            <View style={styles.bottomSection}>
                <InputField
                    label="Email address"
                    icon="mail-outline"
                    placeholder="Enter email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <InputField
                    label="Password"
                    icon="lock-closed-outline"
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.row}>
                    <CheckboxField label="Remember me" value={isRemember} onValueChange={setIsRemember} />
                    <TouchableOpacity onPress={() => navigation.navigate('TestForgotPasswordScreen')}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <AuthButton title="LOG IN" onPress={handleLogin} />

                <View style={styles.signupContainer}>
                    <Text>Not registered yet? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TestRegisterScreen')}>
                        <Text style={styles.signupText}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

