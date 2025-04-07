import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ onClose, onSearch, results }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {/* <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Ionicons name="search-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close-outline" size={24} color="white" />
      </TouchableOpacity> */}

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
});
