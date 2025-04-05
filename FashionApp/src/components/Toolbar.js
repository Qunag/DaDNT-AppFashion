import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Toolbar({ toggleProfile, onSearch }) {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleSearch = (text) => {
    setInputText(text);
    onSearch(text); // Gọi về HomeScreen để cập nhật tìm kiếm
  };

  return (
    <View style={styles.container}>
      {showSearch ? (
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            value={inputText}
            onChangeText={handleSearch}
            style={styles.searchInput}
            autoFocus
            maxLength={50} // Giới hạn ký tự tìm kiếm
          />
          <TouchableOpacity onPress={() => {
            setShowSearch(false);
            setInputText("");
            onSearch(""); // Reset tìm kiếm
          }}>
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
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

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopWidth: 0,
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});
