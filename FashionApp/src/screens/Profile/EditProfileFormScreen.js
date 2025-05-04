import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "../../services/userService";
import Toast from 'react-native-toast-message';


const EditProfileFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passedUserData = route.params?.userData || {};

  const [name, setName] = useState(passedUserData.name || "");
  const [email, setEmail] = useState(passedUserData.email || "");
  const [phone, setPhone] = useState(passedUserData.phone || "");
  const [address, setAddress] = useState(passedUserData.address || "");

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Vui lòng điền đầy đủ thông tin',
      });      
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const userId =
        decodedToken.sub ||
        decodedToken.userId ||
        decodedToken.id ||
        decodedToken.user;

      const updatedUser = { name, email, phone, address };
      await updateUser(userId, updatedUser);
      Toast.show({
        type: 'success',
        text1: 'Thanh công',
        text2: 'Thông tin đã được cập nhật',
      });
      
      navigation.goBack();

    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể cập nhật thông tin. Vui lòng thử lại sau.',
      }); 
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
          <Image
            source={{
              uri:
                passedUserData.avatarUrl ||
                "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#f0f0f0" }]}
            value={email}
            editable={false}
            placeholder="example@email.com"
            keyboardType="email-address"
          />


          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="0987654321"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Số nhà, đường, phường..."
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu thông tin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#6342E8",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: Platform.OS === "ios" ? 60 : 40,
    padding: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6342E8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#6342E8",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileFormScreen;
