import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ product, onPress }) => {
  const firstColor = product.colors?.[0];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {firstColor?.image_url ? (
        <Image
          source={{ uri: firstColor.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Text style={{ color: "red" }}>Không có ảnh</Text>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>
          Giá: {product.price ? product.price.toLocaleString("vi-VN") + " VNĐ" : "Đang cập nhật..."}
        </Text>
        <Text style={styles.brand}>Thương hiệu: {product.brand}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: "black",
    height: 230,
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 8,
  },
  info: {
    alignItems: "center",
    marginTop: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#e74c3c",
    marginTop: 2,
  },
  brand: {
    fontSize: 12,
    color: "#666",
  },
});

export default ProductCard;
