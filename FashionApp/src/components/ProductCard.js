import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Thêm icon làm placeholder

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
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={40} color="#999" />
          <Text style={styles.placeholderText}>Không có ảnh</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {product.name}
        </Text>
        <Text style={styles.price}>
          {product.price
            ? `${product.price.toLocaleString("vi-VN")} VNĐ`
            : "Đang cập nhật..."}
        </Text>
        <Text style={styles.brand} numberOfLines={1} ellipsizeMode="tail">
          {product.brand}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff", // Nền trắng để sạch sẽ
    margin: 8, // Giảm margin để các thẻ sát nhau hơn trong 2 cột
    padding: 10,
    borderRadius: 12, // Góc bo tròn mềm mại
    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 240, // Tăng chiều cao một chút để cân đối
  },
  image: {
    width: "100%",
    height: 140, // Giảm chiều cao hình ảnh để cân đối với phần thông tin
    borderRadius: 8,
    backgroundColor: "#f0f0f0", // Nền xám nhạt khi hình ảnh đang tải
  },
  imagePlaceholder: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  info: {
    flex: 1,
    marginTop: 8, // Giảm khoảng cách trên để cân đối
    alignItems: "center",
    justifyContent: "space-between", // Phân bố đều các dòng thông tin
    paddingVertical: 4,
  },
  name: {
    fontSize: 14, // Giảm kích thước chữ để vừa với 1 dòng
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#e63946", // Màu đỏ nổi bật cho giá
    marginVertical: 4,
  },
  brand: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});

export default ProductCard;