import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icon
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/ResetPasswordStyles';
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/Button';
import InputField from '../../components/InputField';

export default function ResetPassword() {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleResetPassword = () => {
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

        Alert.alert('Thành công', 'Mật khẩu đã được đặt lại!');
        navigation.replace('Login'); // Chuyển về màn hình đăng nhập
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <BackButton />

                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>Enter your new password</Text>

                {/* Trường nhập mật khẩu mới */}
                <InputField
                    label="New Password"
                    icon="lock-closed"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!isPasswordVisible} // Ẩn/hiện mật khẩu
                    rightIcon={
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="gray"
                            onPress={() => setPasswordVisible(!isPasswordVisible)} // Toggle trạng thái
                        />
                    }
                />

                {/* Trường xác nhận mật khẩu */}
                <InputField
                    label="Confirm Password"
                    icon="lock-closed"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible} // Ẩn/hiện mật khẩu xác nhận
                    rightIcon={
                        <Ionicons
                            name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="gray"
                            onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} // Toggle trạng thái
                        />
                    }
                />

                {/* Nút xác nhận */}
                <CustomButton title="Reset Password" type="fill" onPress={handleResetPassword} />
            </View>
        </TouchableWithoutFeedback>
    );
}
