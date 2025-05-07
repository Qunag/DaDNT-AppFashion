import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ProductCard = ({ product, onPress }) => {
  const colors = product.colors || [];

  // Kiểm tra xem một màu còn hàng không
  const isColorAvailable = (color) =>
    color.sizes?.some((size) => size.quantity > 0);

  // Mặc định là màu đầu tiên
  let displayColor = colors[0];

  // Nếu màu đầu tiên hết hàng, tìm màu tiếp theo còn hàng
  if (displayColor && !isColorAvailable(displayColor)) {
    const nextAvailableColor = colors.slice(1).find(isColorAvailable);
    if (nextAvailableColor) {
      displayColor = nextAvailableColor;
    }
  }

  const isOutOfStock = !colors.some(isColorAvailable);

  const isMissingInfo = !product.name || !product.price || !product.brand;

  const handlePress = () => {
    if (isMissingInfo) {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Sản phẩm đang được cập nhật, vui lòng quay lại sau.",
      });
    } else {
      onPress?.();
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {displayColor?.image_url ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: displayColor.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
          {isOutOfStock && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Hết hàng</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={40} color="#999" />
          <Text style={styles.placeholderText}>Chưa có ảnh</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {product.name || "Đang cập nhật..."}
        </Text>
        <Text style={styles.price}>
          {product.price
            ? `${product.price.toLocaleString("vi-VN")} VNĐ`
            : "Đang cập nhật..."}
        </Text>
        <Text style={styles.brand} numberOfLines={1} ellipsizeMode="tail">
          {product.brand || "Đang cập nhật..."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 8,
    padding: 10,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 240,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 140,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#e63946",
    marginVertical: 4,
  },
  brand: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});

export default ProductCard;
