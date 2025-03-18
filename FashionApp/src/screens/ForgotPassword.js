import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    // Hàm kiểm tra định dạng email hợp lệ
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendOTP = async () => {
        if (!email) {
            Alert.alert('Error', 'Vui lòng nhập email');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Email không hợp lệ. Vui lòng nhập đúng định dạng.');
            return;
        }

        try {
            const response = await fetch("Điền Link Vào đây", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Thành công', 'Mã OTP đã được gửi vào email');
                navigation.navigate('VerifyOTP', { email });
            } else {
                Alert.alert('Error', data.message || 'Không thể gửi OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>Forgot password</Text>
                    <Text style={styles.subtitle}>Enter email to receive OTP code</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                        <Text style={styles.buttonText}>Send OTP code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        paddingHorizontal: 20 
    },
    backButton: { 
        position: 'absolute', 
        top: 40, 
        left: 10, 
        padding: 10 
    },
    content: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    subtitle: { 
        fontSize: 16, 
        color: 'gray', 
        marginBottom: 20 
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        borderRadius: 54
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
});
