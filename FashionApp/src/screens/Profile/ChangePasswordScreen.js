import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/Profile/ChangePassStyles'; 

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }
    if (newPassword !== confirmPassword) {
      return alert('Mật khẩu mới không khớp');
    }
    alert('Mật khẩu đã được thay đổi (demo)');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const renderInput = (label, value, setValue, show, setShow) => (
    <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={label}
        secureTextEntry={!show}
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity onPress={() => setShow(!show)} style={styles.toggleIcon}>
        <Ionicons name={show ? 'eye-outline' : 'eye-off-outline'} size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>

      {renderInput('Mật khẩu cũ', oldPassword, setOldPassword, showOld, setShowOld)}
      {renderInput('Mật khẩu mới', newPassword, setNewPassword, showNew, setShowNew)}
      {renderInput('Xác nhận mật khẩu mới', confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

