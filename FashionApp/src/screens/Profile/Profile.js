import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../services/userService";
import { logoutUser } from "../../services/authService";
import { createCartIfNotExists } from "../../services/cartService";

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

        <TouchableOpacity
          style={styles.button}
          onPress={handleCart}
          disabled={loading}
        >
          {loading ? (
            <Ionicons name="hourglass" size={24} color="white" />
          ) : (
            <Ionicons name="bag-outline" size={24} color="white" />
          )}
          <Text style={styles.buttonText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="help-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="alert-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
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
    backgroundColor: "#6342E8",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 0 },
    elevation: 10,
    zIndex: 100,
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
    marginTop: 55,
    paddingVertical:10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  avatar: {
    width: 45,
    height: 45,
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
    fontSize: 9,
    color: "white",
  },
  button: {
    padding: 10,
    backgroundColor: "#6342E8",
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
