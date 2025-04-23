import React, { useState } from 'react';
import { View, Text, Alert, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import { registerUser } from '../../services/authService';
import styles from '../../styles/RegisterStyles';

export default function RegisterScreen() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [isPasswordVisible, setPasswordVisible] = useState(false); // State để ẩn/hiện mật khẩu
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State để ẩn/hiện mật khẩu xác nhận
    const navigation = useNavigation();

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleRegister = async () => {
        const { name, email, password, confirmPassword } = form;

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            await registerUser(name, email, password);
            Alert.alert('Success', 'Registration successful! You can now log in.', [
                { text: 'OK', onPress: () => navigation.navigate('CodeScreen', { email }) },
            ]);
        } catch (error) {
            if (error.message === 'Email already taken') {
                Alert.alert(
                    'Email Already Exists',
                    'This email is already registered. Please try another email.',
                    [
                        { text: 'OK', onPress: () => setForm({ ...form, email: '' }) }, // Xóa trường email
                    ]
                );
            } else {
                Alert.alert('Error', error.message || 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/anh2.png')} style={styles.topSection}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Create an Account</Text>
                </ImageBackground>

                <View style={styles.bottomSection}>
                    <InputField
                        label="Full Name"
                        icon="person-outline"
                        placeholder="Enter your name"
                        value={form.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    <InputField
                        label="Email"
                        icon="mail-outline"
                        placeholder="Enter email"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                    <InputField
                        label="Password"
                        icon="lock-closed-outline"
                        placeholder="Enter password"
                        secureTextEntry={!isPasswordVisible} // Ẩn/hiện mật khẩu
                        value={form.password}
                        onChangeText={(text) => handleChange('password', text)}
                        rightIcon={
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="gray"
                                onPress={() => setPasswordVisible(!isPasswordVisible)} // Toggle trạng thái
                            />
                        }
                    />
                    <InputField
                        label="Confirm Password"
                        icon="lock-closed-outline"
                        placeholder="Confirm password"
                        secureTextEntry={!isConfirmPasswordVisible} // Ẩn/hiện mật khẩu xác nhận
                        value={form.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                        rightIcon={
                            <Ionicons
                                name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="gray"
                                onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} // Toggle trạng thái
                            />
                        }
                    />

                    <AuthButton title="REGISTER" onPress={handleRegister} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
