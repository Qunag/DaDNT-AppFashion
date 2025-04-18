import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { addToCart } from "../../services/cartService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProductDetail } from "../../services/productService";

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [stockQuantity, setStockQuantity] = useState(0);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetail(productId);
        setProduct(data);
  
        if (data.colors && data.colors.length > 0) {
          const defaultColor = data.colors[0];
          setSelectedColor(defaultColor);
  
          if (defaultColor.sizes && defaultColor.sizes.length > 0) {
            const defaultSize = defaultColor.sizes[0];
            setSelectedSize(defaultSize);
            setStockQuantity(defaultSize.quantity);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error.message);
      }
    };
  
    fetchProduct();
  }, [productId]);
  


  if (!product) {
    return <Text>Đang tải sản phẩm...</Text>;
  }


  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(color.sizes[0]);
    setStockQuantity(color.sizes[0].quantity);
  };

  // Xử lý sự kiện chọn kích cỡ
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setStockQuantity(size.quantity);  // Cập nhật lại số lượng kho khi thay đổi kích cỡ
  };

  // Thay đổi số lượng sản phẩm
  const handleQuantityChange = (operation) => {
    let newQuantity = selectedQuantity;
    if (operation === "increase") {
      newQuantity = selectedQuantity + 1;
    } else if (operation === "decrease" && selectedQuantity > 1) {
      newQuantity = selectedQuantity - 1;
    }

    // Kiểm tra số lượng không vượt quá số lượng trong kho
    if (newQuantity > 0 && newQuantity <= stockQuantity) {
      setSelectedQuantity(newQuantity);
    } else {
      alert(`Số lượng không hợp lệ. Tối đa là ${stockQuantity} sản phẩm.`);
    }
  };


  const handleAddToCart = async () => {
    try {
      const productId = product.id ? product.id.toString() : null;
      if (!productId || !/^[0-9a-fA-F]{24}$/.test(productId)) {
        alert("ID sản phẩm không hợp lệ.");
        return;
      }

      const color = selectedColor.color_name ? selectedColor.color_name.toString() : '';
      const size = selectedSize.size ? selectedSize.size.toString() : '';  // Đảm bảo size là chuỗi
      const quantity = parseInt(selectedQuantity) || 1;

      // Thêm các thông tin khác vào payload
      const name = product.name;
      const brand = product.brand;
      const price = product.price;
      const image_url = selectedColor.image_url || ''; // Đảm bảo rằng mỗi màu có image_url riêng

      console.log("Thêm vào giỏ hàng:", { name });

      await addToCart(productId, name, image_url, brand, price, quantity, color, size); // Gọi hàm thêm sản phẩm vào giỏ hàng
      alert("Đã thêm sản phẩm vào giỏ hàng!");
      navigation.navigate("Home"); // Chuyển hướng đến giỏ hàng sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };


  // Hiển thị khi dữ liệu sản phẩm chưa tải xong
  if (!product) {
    return <Text>Đang tải sản phẩm...</Text>;
  }

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
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} VNĐ</Text>
          <Text style={styles.description}>{product.discription}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange("decrease")} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{selectedQuantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange("increase")} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>

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
                    {
                      backgroundColor:
                        color.color_name === "Đen"
                          ? "black"
                          : color.color_name === "Trắng"
                            ? "white"
                            : color.color_name,
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Chọn kích thước:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sizeScrollContainer}
          >
            {selectedColor.sizes.map((size) => (
              <TouchableOpacity
                key={size._id}
                style={[
                  styles.sizeButtonHorizontal,
                  selectedSize.size === size.size && styles.selectedSize,
                ]}
                onPress={() => handleSizeSelect(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize.size === size.size && styles.selectedSizeText,
                  ]}
                >
                  {size.size}
                </Text>
                <Text style={styles.sizeQuantity}>Còn {size.quantity}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={24} color="white" />
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sizeQuantity: {
    fontSize: 12,
    color: "#8A8A8A",
    marginTop: 5,
    textAlign: "center",
  },
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
    width: 200,
    height: 220,
    resizeMode: "contain",
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
    marginTop: -20,
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
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
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
  sizeScrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 10,
  },
  sizeButtonHorizontal: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    alignItems: "center",
    minWidth: 80,
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
    marginTop: 20,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProductDetailScreen;