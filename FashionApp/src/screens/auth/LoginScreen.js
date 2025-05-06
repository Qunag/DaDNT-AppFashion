import React, { useState } from 'react';
import {View, Text, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import InputField from '../../components/InputField';
import CheckboxField from '../../components/CheckBoxField';
import AuthButton from '../../components/AuthButton';
import BackButton from '../../components/BackButton';
import { loginUser } from '../../services/authService';
import styles from '../../styles/LoginStyles';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function LoginScreen() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        isRemember: false,
    });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleChange = (field, value) => {
        setCredentials(prev => ({ ...prev, [field]: value }));
    };

    const showToast = (message, type = 'error') => {
        Toast.show({
            type,
            text1: message,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
        });
    };

    const handleLogin = async () => {
        const { email, password, isRemember } = credentials;
    
        // Kiểm tra trường hợp cả email và mật khẩu trống
        if (!email && !password) {
            showToast('Vui lòng nhập đầy đủ cả email và mật khẩu');
            return;
        }
    
        // Kiểm tra trường hợp email trống
        if (!email) {
            showToast('Vui lòng nhập email.');
            return;
        }
    
        // Kiểm tra trường hợp mật khẩu trống
        if (!password) {
            showToast('Vui lòng nhập mật khẩu.');
            return;
        }
    
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Đăng nhập thất bại. Vui lòng nhập đúng email.');
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await loginUser(email, password);
    
                // Nếu có tokens, thực hiện lưu và chuyển màn hình
                if (tokens) {
                    if (isRemember) {
                        await AsyncStorage.setItem('accessToken', tokens.access.token);
                        await AsyncStorage.setItem('user', JSON.stringify(user));
                    }
    
                    showToast('Đăng nhập thành công!', 'success');
                    navigation.navigate('Home');
                }
            
        } catch (error) {
            setIsLoading(false);
            
            // Kiểm tra lỗi từ backend
            const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
            if (errorMessage === 'Tài khoản không tồn tại.') {
                showToast('Tài khoản không tồn tại.');
            } else {
                showToast(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../../assets/anh2.png')}
                        style={styles.topSection}
                    >
                        <BackButton />
                        <View style={styles.overlay} />
                        <Text style={styles.welcomeText}>Chào mừng bạn trở lại!</Text>
                    </ImageBackground>

                    <View style={styles.bottomSection}>
                        <InputField
                            label="Địa chỉ Email"
                            icon="mail-outline"
                            placeholder="Nhập email"
                            keyboardType="email-address"
                            value={credentials.email}
                            onChangeText={text => handleChange('email', text)}
                            autoCapitalize="none"
                        />
                        <InputField
                            label="Mật khẩu"
                            icon="lock-closed-outline"
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={!isPasswordVisible}
                            value={credentials.password}
                            onChangeText={text => handleChange('password', text)}
                            rightIcon={
                                <Ionicons
                                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="gray"
                                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                                />
                            }
                        />

                        <View style={styles.row}>
                            <CheckboxField
                                label="Ghi nhớ đăng nhập"
                                value={credentials.isRemember}
                                onValueChange={value => handleChange('isRemember', value)}
                            />
                            <Text
                                style={styles.forgotText}
                                onPress={() => navigation.navigate('ForgotPassword')}
                            >
                                Quên mật khẩu?
                            </Text>
                        </View>

                        <AuthButton title="ĐĂNG NHẬP" onPress={handleLogin} />

                        <View style={styles.signupContainer}>
                            <Text>Chưa có tài khoản? </Text>
                            <Text
                                style={styles.signupText}
                                onPress={() => navigation.navigate('Register')}
                            >
                                Tạo tài khoản
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {isLoading && <LoadingOverlay />}
        </>
    );
}
