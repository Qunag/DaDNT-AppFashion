import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { addToCart } from "../../services/cartService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProductDetail } from "../../services/productService";
import Toast from 'react-native-toast-message';
import styles from "../../styles/Home/ProductDetailStyles";

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [allColorsOutOfStock, setAllColorsOutOfStock] = useState(false);
  const [outOfStockColor, setOutOfStockColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetail(productId);
        setProduct(data);

        if (data.colors && data.colors.length > 0) {
          // Kiểm tra xem tất cả các màu có hết hàng không
          const allOutOfStock = data.colors.every(color =>
            color.sizes.every(size => size.quantity === 0)
          );
          setAllColorsOutOfStock(allOutOfStock);

          // Tìm màu đầu tiên có size còn hàng
          const availableColor = data.colors.find(color =>
            color.sizes.some(size => size.quantity > 0)
          );

          if (availableColor) {
            setSelectedColor(availableColor);

            // Tìm size đầu tiên còn hàng trong màu này
            const availableSize = availableColor.sizes.find(size => size.quantity > 0);

            if (availableSize) {
              setSelectedSize(availableSize);
              setStockQuantity(availableSize.quantity);
              setSelectedQuantity(1);
            } else {
              setSelectedSize(null);
              setStockQuantity(0);
              setSelectedQuantity(1);
            }
          } else {
            // Nếu không có màu nào còn hàng, chọn màu đầu tiên làm mặc định
            setSelectedColor(data.colors[0]);
            setSelectedSize(data.colors[0].sizes[0]);
            setStockQuantity(data.colors[0].sizes[0].quantity);
            setSelectedQuantity(1);
          }

          // Kiểm tra màu hết hàng
          const outOfStockColor = data.colors.find(color =>
            color.sizes.every(size => size.quantity === 0)
          );
          setOutOfStockColor(outOfStockColor);
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);

    const availableSize = color.sizes.find(size => size.quantity > 0);

    if (availableSize) {
      setSelectedSize(availableSize);
      setStockQuantity(availableSize.quantity);
      setSelectedQuantity(1);
    } else {
      setSelectedSize(null);
      setStockQuantity(0);
      setSelectedQuantity(1);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setStockQuantity(size.quantity);
    setSelectedQuantity(1); // Reset số lượng khi đổi kích thước
  };

  const handleQuantityChange = (operation) => {
    let newQuantity = selectedQuantity;
    if (operation === "increase") {
      newQuantity = selectedQuantity + 1;
    } else if (operation === "decrease" && selectedQuantity > 1) {
      newQuantity = selectedQuantity - 1;
    }

    if (newQuantity > 0 && newQuantity <= stockQuantity) {
      setSelectedQuantity(newQuantity);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Số lượng không hợp lệ',
        text2: `Tối đa là ${stockQuantity} sản phẩm.`,
      });
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
      const size = selectedSize.size ? selectedSize.size.toString() : '';
      const quantity = parseInt(selectedQuantity) || 1;

      const name = product.name;
      const brand = product.brand;
      const price = product.price;
      const image_url = selectedColor.image_url || '';

      // Kiểm tra nếu tất cả các size của màu đã chọn hết hàng
      const isOutOfStock = selectedColor.sizes.every(size => size.quantity === 0);

      if (isOutOfStock) {
        Toast.show({
          type: 'error',
          text1: 'Sản phẩm này đã hết hàng',
          text2: 'Vui lòng chọn màu hoặc kích thước khác!',
        });
        return;
      }

      await addToCart(productId, name, image_url, brand, price, quantity, color, size);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đã thêm sản phẩm vào giỏ hàng!',
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Thêm sản phẩm thất bại!',
      });
    }
  };

  const isAddToCartDisabled = !selectedColor || !selectedSize || selectedSize.quantity === 0;


  if (!product) {
    return <Text>Đang tải sản phẩm...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          {selectedColor && (
            <View style={styles.imageWrapper}>
              {selectedColor?.image_url ? (
                <Image
                  source={{ uri: selectedColor.image_url }}
                  style={styles.productImage}
                  resizeMode="contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <View style={styles.iconPlaceholder}>
                  <Ionicons name="image-outline" size={80} color="#999" />
                  <Text style={{ color: "#999" }}>Chưa có ảnh</Text>
                </View>
              )}

              {/* Overlay for out-of-stock */}
              {outOfStockColor && selectedColor.color_name === outOfStockColor.color_name && (
                <View style={styles.overlayTopRight}>
                  <Text style={styles.overlayText}>Hết hàng</Text>
                </View>
              )}

            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} VNĐ</Text>
          <ScrollView
            style={styles.descriptionScroll}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.description}>{product.discription}</Text>
          </ScrollView>

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
                style={styles.colorButton}
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
                    selectedColor?.color_name === color.color_name && styles.selectedColorCircle,
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
            {selectedColor?.sizes.map((size) => {
              const isOutOfStock = size.quantity === 0;
              const isSelected = selectedSize?.size === size.size;
              return (
                <TouchableOpacity
                  key={size._id}
                  style={[
                    styles.sizeButtonHorizontal,
                    isSelected && styles.selectedSize,
                    isOutOfStock && styles.disabledSizeButton,
                  ]}
                  onPress={() => !isOutOfStock && handleSizeSelect(size)}
                  disabled={isOutOfStock}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      isSelected && styles.selectedSizeText,
                      isOutOfStock && styles.disabledSizeText,
                    ]}
                  >
                    {size.size}
                  </Text>
                  <Text style={styles.sizeQuantity}>
                    {isOutOfStock ? "Hết hàng" : `Còn ${size.quantity}`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[styles.addToCartButton, isAddToCartDisabled && { backgroundColor: "#D3D3D3" }]}
            onPress={handleAddToCart}
            disabled={isAddToCartDisabled}
          >
            <Ionicons name="cart-outline" size={24} color="white" />
            <Text style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};



export default ProductDetailScreen;