import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InputField from '../components/InputField';
import CheckboxField from '../components/CheckBoxField';
import AuthButton from '../components/AuthButton';
import styles from '../styles/LoginStyles';

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({ email: '', password: '', isRemember: false });
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = credentials;
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      await axios.post('http://10.0.2.2:3000/v1/auth/login', { email, password });
      Alert.alert('Login Successful', 'You have successfully logged in.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
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
          secureTextEntry
          value={credentials.password}
          onChangeText={text => handleChange('password', text)}
        />

        <View style={styles.row}>
          <CheckboxField label="Remember me" value={credentials.isRemember} onValueChange={value => handleChange('isRemember', value)} />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <AuthButton title="LOG IN" onPress={handleLogin} />

        <View style={styles.signupContainer}>
          <Text>Not registered yet? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupText}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}