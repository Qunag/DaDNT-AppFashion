import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "../../services/userService";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../../styles/Profile/EditProfileFormStyles"; 

const EditProfileFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passedUserData = route.params?.userData || {};

  const [name, setName] = useState(passedUserData.name || "");
  const [email, setEmail] = useState(passedUserData.email || "");
  const [phone, setPhone] = useState(passedUserData.phone || "");
  const [address, setAddress] = useState(passedUserData.address || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }

    try {
      setIsLoading(true); // Hiện overlay
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
        type: "success",
        text1: "Thành công",
        text2: "Thông tin đã được cập nhật",
      });

      navigation.goBack();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể cập nhật thông tin. Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false); // Tắt overlay
    }
  };

  return (
    <>
      <Spinner
        visible={isLoading}
        textContent={"Đang lưu..."}
        textStyle={{ color: "#fff" }}
      />
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
    </>
  );
};


export default EditProfileFormScreen;
