import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import InputField from '../../components/InputField';
import CheckboxField from '../../components/CheckBoxField';
import AuthButton from '../../components/AuthButton';
import BackButton from '../../components/BackButton';
import LoadingOverlay from '../../components/LoadingOverlay';

import { loginUser } from '../../services/authService';
import styles from '../../styles/LoginStyles';

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra input cơ bản
    if (!email && !password) {
      showToast('Vui lòng nhập đầy đủ cả email và mật khẩu.');
      return;
    }

    if (!email) {
      showToast('Vui lòng nhập email');
      return;
    }

    if (!emailRegex.test(email)) {
      showToast('Đăng nhập thất bại. Vui lòng nhập đúng email');
      return;
    }

    if (!password) {
      showToast('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginUser(email, password);

      if (response?.tokens?.access?.token) {
        if (isRemember) {
          await AsyncStorage.setItem('accessToken', response.tokens.access.token);
          await AsyncStorage.setItem('user', JSON.stringify(response.user || {}));
        }
        showToast('Đăng nhập thành công! Chào mừng bạn trở lại!', 'success');
        navigation.navigate('Home');
      } else {
        const message = response?.message?.toLowerCase() || '';
        if (message.includes('incorrect email or password')) {

          showToast('Đăng nhập thất bại. Vui lòng nhập đúng email hoặc mật khẩu');
        } else {
          showToast('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
        }
      }
    } catch (error) {

      const message = error.response?.data?.message?.toLowerCase() || '';
      if (message.includes('incorrect email or password')) {
        showToast('Đăng nhập thất bại. Vui lòng nhập đúng email hoặc mật khẩu');
      } else {
        showToast('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <ImageBackground source={require('../../assets/anh2.png')} style={styles.topSection}>
              <BackButton destination="Splash" />
              <View style={styles.overlay} />
              <Text style={styles.welcomeText}>Chào mừng bạn trở lại!</Text>
            </ImageBackground>

            <ScrollView
              contentContainerStyle={styles.bottomSection}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
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
                <Text>Bạn chưa có tài khoản? </Text>
                <Text
                  style={styles.signupText}
                  onPress={() => navigation.navigate('Register')}
                >
                  Tạo tài khoản
                </Text>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {isLoading && <LoadingOverlay />}
    </>
  );
}