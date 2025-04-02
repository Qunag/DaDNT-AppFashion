import React, { useState } from 'react';
import { View, Text, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InputField from '../components/InputField';
import CheckboxField from '../components/CheckBoxField';
import AuthButton from '../components/AuthButton';
import BackButton from '../components/BackButton'; 
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



      await axios.post('http://localhost:3000/v1/auth/login', { email, password });


      Alert.alert('Login Successful', 'You have successfully logged in.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
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
            secureTextEntry
            value={credentials.password}
            onChangeText={text => handleChange('password', text)}
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
