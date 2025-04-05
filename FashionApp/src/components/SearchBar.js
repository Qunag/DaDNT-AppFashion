import React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onClose, onFilterPress }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="Search..." style={styles.input} />

      <TouchableOpacity onPress={onFilterPress} style={styles.icon}>
        <Ionicons name="filter-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.icon}>
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#6342E8",
    paddingHorizontal: 10,
    margin: 14.5,
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
