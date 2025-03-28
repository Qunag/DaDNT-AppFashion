import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";

export default function Toolbar({ toggleProfile }) {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <View style={styles.container}>
      {showSearch ? (
        <SearchBar onClose={() => setShowSearch(false)} />
      ) : (
        <>
          <View style={styles.box1}>
            <TouchableOpacity>
              <Text style={styles.text}>Panda.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box2}>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Ionicons name="bag-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowSearch(true)}>
              <Ionicons name="search-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleProfile}>
              <Ionicons name="menu-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f0f0",
    borderWidth: 3,  
    borderColor: "#6342E8",  
    borderBottomLeftRadius: 30,  // Bo tròn góc dưới trái
    borderBottomRightRadius: 30, // Bo tròn góc dưới phải
    borderTopWidth: 0,  // Ẩn viền trên
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    alignItems: "center",  
    justifyContent: "center",
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
