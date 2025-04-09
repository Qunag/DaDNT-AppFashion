import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";
import Notification from "./Notification";

export default function Toolbar({ toggleProfile, onSearch, cartCount }) {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [inputText, setInputText] = useState("");

  // Hàm xử lý tìm kiếm
  const handleSearch = (text) => {
    setInputText(text);
    onSearch(text);
  };

  // Hàm đóng thanh tìm kiếm
  const handleCloseSearch = () => {
    setShowSearch(false);
    setInputText("");
    onSearch("");
  };

  return (
    <View style={styles.container}>
      {showSearch ? (
        <SearchBar
          onClose={handleCloseSearch}
          onFilterPress={() => {}}
          inputText={inputText}
          onChangeText={handleSearch}
        />
      ) : (
        <>
          <View style={styles.box1}>
            <TouchableOpacity>
              <Text style={styles.text}>Panda.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box2}>
            <TouchableOpacity>
              <View style={styles.notification}>
                <Ionicons name="notifications-outline" size={24} color="black" />
                {cartCount > 0 && <Notification count={cartCount} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <View style={styles.notification}>
                <Ionicons name="bag-outline" size={24} color="black" />
                {cartCount > 0 && <Notification count={cartCount} />}
              </View>
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
    paddingTop: 50,
    backgroundColor: "#f0f0f0",
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
  notification: {
    position: "relative",
    padding: 4,
  },
});