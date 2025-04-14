import React, { useState } from 'react';
import { View, Text, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InputField from '../../components/InputField';
import CheckboxField from '../../components/CheckBoxField';
import AuthButton from '../../components/AuthButton';
import BackButton from '../../components/BackButton';
import { loginUser } from '../../services/authService';
import styles from '../../styles/LoginStyles';
import { Ionicons } from '@expo/vector-icons'; // Import thêm icon nếu chưa có
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserID } from '../../services/authService'; // Import hàm lấy user ID nếu cần thiết




export default function LoginScreen() {
    const [credentials, setCredentials] = useState({ email: '', password: '', isRemember: false });
    const [isPasswordVisible, setPasswordVisible] = useState(false); // State để quản lý hiển thị mật khẩu
    const navigation = useNavigation();

    const handleChange = (field, value) => {
        setCredentials(prev => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        const { email, password } = credentials;
        try {
            // Gọi API đăng nhập và nhận response
            const response = await loginUser(email, password);

            // Kiểm tra xem response có chứa tokens không
            if (response && response.tokens) {
                // Lưu token vào AsyncStorage
                await AsyncStorage.setItem('accessToken', response.tokens.access.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));

                // Hiển thị thông báo thành công
                Alert.alert('Login Successful', 'You have successfully logged in.');

                // Chuyển đến màn hình Home
                navigation.navigate('Home');
            } else {
                throw new Error('No tokens returned from login');
            }
        } catch (error) {

            Alert.alert('Login Failed', error.message || 'Invalid email or password. Please try again.');
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/anh2.png')} style={styles.topSection}>
                    <BackButton />
                    <View style={styles.overlay} />
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                </ImageBackground>

                <View style={styles.bottomSection}>
                    <InputField
                        label="Email address"
                        icon="mail-outline"
                        placeholder="Enter email"
                        keyboardType="email-address"
                        value={credentials.email}
                        onChangeText={text => handleChange('email', text)}
                        autoCapitalize="none"
                    />
                    <InputField
                        label="Password"
                        icon="lock-closed-outline"
                        placeholder="Enter your password"
                        secureTextEntry={!isPasswordVisible} // Thay đổi trạng thái hiển thị mật khẩu
                        value={credentials.password}
                        onChangeText={text => handleChange('password', text)}
                        rightIcon={
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="gray"
                                onPress={() => setPasswordVisible(!isPasswordVisible)} // Toggle trạng thái
                            />
                        }
                    />

                    <View style={styles.row}>
                        <CheckboxField label="Remember me" value={credentials.isRemember} onValueChange={value => handleChange('isRemember', value)} />
                        <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
                    </View>

                    <AuthButton title="LOG IN" onPress={handleLogin} />

                    <View style={styles.signupContainer}>
                        <Text>Not registered yet? </Text>
                        <Text style={styles.signupText} onPress={() => navigation.navigate('Register')}>Create an Account</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
