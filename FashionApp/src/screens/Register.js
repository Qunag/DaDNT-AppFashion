import React, { useState } from 'react';
import { View, Text, Alert, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import { registerUser } from '../services/authService';
import styles from '../styles/RegisterStyles';
import BackButton from '../components/BackButton';

export default function RegisterScreen() {

    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
            Alert.alert('Success', 'Registration successful! You can now log in.');
            navigation.navigate('LoginScreen');
        } catch (error) {
            Alert.alert('Registration Failed', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
                    <BackButton />
                    <Text style={styles.welcomeText}>Create an Account</Text>
                </ImageBackground>

                <View style={styles.bottomSection}>
                    <InputField label="Full Name" icon="person-outline" placeholder="Enter your name" value={form.name} onChangeText={(text) => handleChange('name', text)} />
                    <InputField label="Email" icon="mail-outline" placeholder="Enter email" keyboardType="email-address" value={form.email} onChangeText={(text) => handleChange('email', text)} />
                    <InputField label="Password" icon="lock-closed-outline" placeholder="Enter password" secureTextEntry value={form.password} onChangeText={(text) => handleChange('password', text)} />
                    <InputField label="Confirm Password" icon="lock-closed-outline" placeholder="Confirm password" secureTextEntry value={form.confirmPassword} onChangeText={(text) => handleChange('confirmPassword', text)} />

                    <AuthButton title="REGISTER" onPress={handleRegister} />
                      </View>

  
            </View>
        </TouchableWithoutFeedback>
    );
}
