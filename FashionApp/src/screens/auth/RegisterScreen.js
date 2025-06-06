import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import { registerUser } from '../../services/authService';
import styles from '../../styles/Auth/RegisterStyles';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[a-zA-ZÀ-ỹ\s]+$/u;
    return re.test(name.trim());
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name.trim() && !email.trim() && !password && !confirmPassword) {
      showToast('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!name.trim()) {
      showToast('Vui lòng nhập họ tên.');
      return;
    }

    if (!validateName(name)) {
      showToast('Họ và tên không được chứa số hoặc ký tự đặc biệt.');
      return;
    }

    if (!email.trim()) {
      showToast('Vui lòng nhập email.');
      return;
    }

    if (!validateEmail(email)) {
      showToast('Email không hợp lệ.');
      return;
    }

    if (!password) {
      showToast('Vui lòng nhập mật khẩu.');
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      showToast('Mật khẩu phải có ít nhất 8 ký tự bao gồm cả số và chữ.');
      return;
    }

    if (!confirmPassword) {
      showToast('Vui lòng xác nhận mật khẩu.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Mật khẩu không khớp.');
      return;
    }

    try {
      setLoading(true);
      await registerUser(name, email, password);
      setLoading(false);
      showToast('Đăng ký thành công! Vui lòng kiểm tra email để xác minh.', 'success');
      navigation.navigate('CodeScreen', { email });
    } catch (error) {
      setLoading(false);
      const message = error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';

      if (message.includes('Email already taken')) {
        showToast('Email đã được sử dụng. Vui lòng chọn email khác.');
        setForm({ ...form, email: '' });
      } else {
        showToast(message);
      }
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
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.welcomeText}>Tạo tài khoản</Text>
            </ImageBackground>

            <ScrollView
              contentContainerStyle={[styles.scrollContent]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.bottomSection}>
                <InputField
                  label="Họ và tên"
                  icon="person-outline"
                  placeholder="Nhập họ tên"
                  value={form.name}
                  onChangeText={(text) => handleChange('name', text)}
                />
                <InputField
                  label="Email"
                  icon="mail-outline"
                  placeholder="Nhập email"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                />
                <InputField
                  label="Mật khẩu"
                  icon="lock-closed-outline"
                  placeholder="Nhập mật khẩu"
                  secureTextEntry={!isPasswordVisible}
                  value={form.password}
                  onChangeText={(text) => handleChange('password', text)}
                  rightIcon={
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color="gray"
                      onPress={() => setPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
                <InputField
                  label="Xác nhận mật khẩu"
                  icon="lock-closed-outline"
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry={!isConfirmPasswordVisible}
                  value={form.confirmPassword}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                  rightIcon={
                    <Ionicons
                      name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color="gray"
                      onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    />
                  }
                />

                <AuthButton title="ĐĂNG KÝ" onPress={handleRegister} />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {loading && <LoadingOverlay />}
    </>
  );
}
