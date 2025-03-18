import React from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Profile = ({ isVisible, toggleProfile, profileAnim }) => {
  return (
    <>
      {/* Nền mờ khi Profile mở */}
      {isVisible && <TouchableOpacity style={styles.overlay} onPress={toggleProfile} />}

      {/* Bảng Profile */}
      <Animated.View style={[styles.profilePanel, { left: profileAnim }]}>
        {/* Thông tin người dùng */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg" }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Trần Phạm Nhật Quân</Text>
            <Text style={styles.userEmail}>quan@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Ionicons name = "bag-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Oders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="heart-outline" size={24} color="white" />
          <Text style={styles.buttonText}>WishList</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="egg-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Delivery Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="card-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="ticket-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Promo Cord</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="help-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="alert-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  profilePanel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#8077fe",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 0 },
    elevation: 10,
    zIndex: 100, // Luôn nổi trên cùng
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 12,
    color: "white",
  },
  button: {
    padding: 10,
    backgroundColor: "#8077fe",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 8,
  },
});

export default Profile;