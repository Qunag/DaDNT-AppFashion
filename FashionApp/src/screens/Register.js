import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterScreen() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigation = useNavigation();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
      await axios.post('http://10.0.2.2:3000/v1/auth/register', { name, email, password });
      Alert.alert('Success', 'Registration successful! You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Full error:', error.response?.data || error);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/anh2.png')} style={styles.topSection}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.overlay} />
          <Text style={styles.welcomeText}>Create an Account</Text>
          <Text style={styles.subText}>Sign up to start your shopping journey</Text>
        </ImageBackground>

        <View style={styles.bottomSection}>
          {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
            <View key={index} style={styles.inputWrapper}>
              <Text style={styles.label}>{field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name={field.includes('password') ? 'lock-closed-outline' : field === 'email' ? 'mail-outline' : 'person-outline'}
                  size={25}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={`Enter your ${field}`}
                  secureTextEntry={field.includes('password')}
                  keyboardType={field === 'email' ? 'email-address' : 'default'}
                  value={form[field]}
                  onChangeText={(value) => handleChange(field, value)}
                  autoCapitalize={field === 'email' ? 'none' : 'words'}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>REGISTER</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}> Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topSection: { flex: 1.2, justifyContent: 'center', alignItems: 'center', width: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  backButton: { position: 'absolute', top: 40, left: 10, zIndex: 10, padding: 10 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  subText: { fontSize: 16, color: 'white', textAlign: 'center', marginTop: 5 },
  bottomSection: {
    flex: 1.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 10,
  },
  inputWrapper: { width: '100%', marginBottom: 15 },
  label: { alignSelf: 'flex-start', marginBottom: 5, fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '100%',
  },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16 },
  registerButton: {
    backgroundColor: '#7F00FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  registerText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  signupText: { color: '#7F00FF', fontWeight: 'bold' },
});
