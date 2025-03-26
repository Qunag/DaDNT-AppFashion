import React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onClose }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="Search..." style={styles.input} />
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 8,
  },
});

export default SearchBar;
