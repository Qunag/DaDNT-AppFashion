import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../services/userService";
import { logoutUser } from "../../services/authService";
import { createCartIfNotExists } from "../../services/cartService";
import styles from "../../styles/Profile/ProfileStyles"; 

const Profile = ({ isVisible, toggleProfile, profileAnim }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) return;

        const decoded = jwtDecode(accessToken);
        const userId =
          decoded.sub || decoded.userId || decoded.id || decoded.user;

        if (!userId) return;

        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user ở Profile:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleCart = async () => {
    setLoading(true);
    try {
      const cart = await createCartIfNotExists();
      navigation.navigate("Cart", { cart });
    } catch (error) {
      console.error("Failed to fetch cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleProfile} />
      )}

      <Animated.View style={[styles.profilePanel, { left: profileAnim }]}>
        <TouchableOpacity
          style={styles.profileHeader}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Image
            source={{
              uri:
                user?.avatarUrl ||
                "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg",
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "Người dùng"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "email@example.com"}
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Đăng Xuất</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};


export default Profile;
