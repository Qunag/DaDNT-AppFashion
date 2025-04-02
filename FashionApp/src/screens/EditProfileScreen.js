import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Hiển thị ảnh cố định */}
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg" }} style={styles.image} />
        </View>

        {/* Hiển thị thông tin cố định */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên:</Text>
          <Text style={styles.infoText}>Trần Phạm Nhật Quân</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>quan@gmail.com</Text>

          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.infoText}>0123456789</Text>

          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.infoText}>123 Đường ABC, Quận XYZ, TP. HCM</Text>
        </View>
      </View>

      {/* Nút sửa thông tin */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfileForm")}>
        <Text style={styles.buttonText}>Sửa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  profileContainer: {
    marginTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 40,
    padding: 10,
    borderRadius: 50,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#6342E8",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
    shadowColor: "#6342E8",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
