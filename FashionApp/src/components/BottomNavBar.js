import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Notification from "./Notification";

const BottomNavBar = ({ toggleProfile, cartItemCount }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={24} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Cart")}>
        <View style={styles.notification}>
          <Ionicons name="bag-outline" size={24} color="#ffffff" />
          <Notification count={cartItemCount} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={toggleProfile}>
        <Ionicons name="person-outline" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6342E8",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 8,
  },
  notification: {
    position: "relative",
    padding: 4,
  },
});

export default BottomNavBar;