import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Toolbar({ toggleProfile }) {
      const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        {/* Logo */}
        <TouchableOpacity>
          <Text style={styles.text}>Panda.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box2}>
        {/* Các nút chức năng */}
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="bag-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Nút Menu mở Profile */}
        <TouchableOpacity onPress={toggleProfile}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  box1: {
    padding: 20,
    flex: 0.3,
  },
  box2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    flex: 0.7,
  },
});