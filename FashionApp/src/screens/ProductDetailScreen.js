import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios"; // Thêm axios để lấy dữ liệu từ API

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params; // Lấy ID sản phẩm từ route
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Lấy thông tin sản phẩm từ backend khi component load
  useEffect(() => {
    axios
      .get(`http://192.168.0.103:3000/v1/products/${productId}`) // Sử dụng API để lấy dữ liệu sản phẩm
      .then((response) => {
        setProduct(response.data);
        setSelectedColor(response.data.colors[0]); // Đặt mặc định là màu đầu tiên
        setSelectedSize(response.data.colors[0].sizes[0]); // Đặt mặc định là kích thước đầu tiên
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }, [productId]);




  if (!product) {
    return <Text>Đang tải sản phẩm...</Text>;
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(color.sizes[0]); // Reset kích thước khi chọn màu mới
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          {selectedColor && (
            <Image
              source={{ uri: selectedColor.image_url }}
              style={styles.productImage}
              resizeMode="contain"
            />

          )}
          <TouchableOpacity style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>


        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} VNĐ</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.row}>
            <View style={styles.rating}>
              {[...Array(4)].map((_, index) => (
                <Ionicons key={index} name="star" size={16} color="gold" />
              ))}
              <Ionicons name="star-outline" size={16} color="gold" />
              <Text style={styles.ratingText}>(4.5)</Text>
            </View>
          </View>


          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>


          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>


      <View style={styles.footer}>
        <Text style={styles.sectionTitle}>Chọn màu:</Text>
        <View style={styles.colorContainer}>
          {product.colors.map((color) => (
            <TouchableOpacity
              key={color._id}
              style={[
                styles.colorButton,
                selectedColor.color_name === color.color_name && styles.selectedColor,
              ]}
              onPress={() => handleColorSelect(color)}
            >
              <View
                style={[
                  styles.colorCircle,
                  { backgroundColor: color.color_name }, // Sử dụng màu từ color_name
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Chọn kích thước:</Text>
        <View style={styles.sizeContainer}>
          {selectedColor.sizes.map((size) => (
            <TouchableOpacity
              key={size._id}
              style={[styles.sizeButton, selectedSize.size === size.size && styles.selectedSize]}
              onPress={() => handleSizeSelect(size)}
            >
              <Text
                style={[styles.sizeText, selectedSize.size === size.size && styles.selectedSizeText]}
              >
                {size.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    position: "relative",
  },
  productImage: {
    width: 200, // Đảm bảo chiều rộng phù hợp
    height: 220, // Đảm bảo chiều cao phù hợp
    resizeMode: "contain", // Hoặc "cover" tùy vào yêu cầu
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  wishlistButton: {
    position: "absolute",
    right: 20,
    top: 40,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Tạo hiệu ứng trôi
  },
  brand: {
    fontSize: 16,
    color: "#8A8A8A",
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E74C3C",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#8A8A8A",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  quantityButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: "#333",
  },
  footer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  colorButton: {
    margin: 8,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  selectedColor: {
    borderColor: "#6342E8",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  sizeButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  selectedSize: {
    backgroundColor: "#6342E8",
  },
  sizeText: {
    fontSize: 16,
    color: "#555",
  },
  selectedSizeText: {
    color: "white",
    fontWeight: "bold",
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: "#6342E8",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProductDetailScreen;
