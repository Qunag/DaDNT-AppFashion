import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProductCard from "./ProductCard"; // 👈 import component mới

const Watch = ({ products, loading }) => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách sản phẩm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList

          data={products}
          keyExtractor={(item) => item._id?.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetail", { productId: item._id })}
            />
          )}

        />
      )}

      {/* Danh sách các trang */}
      <View style={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.pageButton, page === index + 1 && styles.activePageButton]}
            onPress={() => handlePageChange(index + 1)} // Chuyển sang trang được chọn
          >
            <Text style={styles.pageButtonText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderWidth: 3,
    borderColor: "#6342E8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },

});

export default Watch;
