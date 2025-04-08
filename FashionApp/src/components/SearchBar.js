import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const SearchBar = ({ onClose, onFilterPress, inputText, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Tìm kiếm sản phẩm..."
        style={styles.input}
        value={inputText}
        onChangeText={onChangeText} 
      />


      <TouchableOpacity onPress={onFilterPress} style={styles.icon}>
        <Ionicons name="filter-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.icon}>
        <Ionicons name="close-outline" size={24} color="black" />

      </TouchableOpacity>


      {/* Hiển thị kết quả tìm kiếm */}
      {/* <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.name}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6342E8",
    borderRadius: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#4A30C4",
    borderRadius: 5,
    marginRight: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#D9534F",
    borderRadius: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultText: {
    color: "white",
  },
  icon: {
    marginLeft: 10,
  },
});
