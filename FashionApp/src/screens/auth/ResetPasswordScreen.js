import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Auth/ResetPasswordStyles';
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/Button';
import InputField from '../../components/InputField';
import { resetPassword } from '../../services/authService';

export default function ResetPassword() {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu không khớp');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(newPassword);
            Alert.alert('Đổi mật khẩu thành công', 'Vui lòng đăng nhập lại');
            navigation.replace('Login');
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <BackButton />

                <Text style={styles.title}>Đổi mật khẩu</Text>
                <Text style={styles.subtitle}>Nhập mật khẩu mới của bạn</Text>

                <InputField
                    label="Mật khẩu mới"
                    icon="lock-closed"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!isPasswordVisible}
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
                    label="Xác nhận mật khẩu mới"
                    icon="lock-closed"
                    placeholder="Nhập mật khẩu mới"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                    rightIcon={
                        <Ionicons
                            name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="gray"
                            onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        />
                    }
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
                ) : (
                    <CustomButton title="Đổi mật khẩu" type="fill" onPress={handleResetPassword} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}
