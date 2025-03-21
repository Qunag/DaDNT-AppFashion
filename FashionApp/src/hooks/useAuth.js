import { useState } from 'react';
import { Alert } from 'react-native';
import { loginUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

export const useAuth = () => {
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
            await loginUser(email, password);
            Alert.alert('Login Successful', 'You have successfully logged in.');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Login Failed', error);
        }
    };

    return { credentials, handleChange, handleLogin };
};
