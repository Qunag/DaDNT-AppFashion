import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EditProfileForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("Trần Phạm Nhật Quân");
  const [email, setEmail] = useState("quan@gmail.com");
  const [phone, setPhone] = useState("0123456789");
  const [address, setAddress] = useState("123 Đường ABC, Quận XYZ, TP. HCM");

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg" }} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Tên:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <Text style={styles.label}>Địa chỉ:</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  profileContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#f2f2f2",
  },
  button: {
    backgroundColor: "#6342E8",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileForm;
