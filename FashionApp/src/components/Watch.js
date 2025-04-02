import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://192.168.1.242:3000/v1/products"; // Địa chỉ API backend của bạn

const Watch = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Dữ liệu sản phẩm từ API:", data); // Debug để kiểm tra dữ liệu
        setProducts(data.results); // ✅ Chỉ lấy danh sách sản phẩm
      } catch (error) {
        console.error("Lỗi tải sản phẩm từ API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách sản phẩm</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => {
            const firstColor = item.colors && item.colors.length > 0 ? item.colors[0] : null;
            return (
              <TouchableOpacity
                style={styles.productItem}
                onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
              >
                {firstColor?.image_url ? (
                  <Image
                    source={{ uri: firstColor.image_url }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={{ color: "red" }}>Không có ảnh</Text>
                )}

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>Giá: {item.price.toLocaleString()} VNĐ</Text>
                  <Text style={styles.productBrand}>Thương hiệu: {item.brand}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
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
  productItem: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    borderWidth: 2, 
    borderColor: "black",
    height: 200, // Cố định chiều cao cho từng item
  },
  productImage: {
    width: '100%',      // Đảm bảo ảnh sẽ fill hết chiều rộng
    height: '70%',      // Tạo chiều cao nhất định để ảnh không tràn ra ngoài
    borderRadius: 8,
  },
  productInfo: {
    alignItems: "center",
    marginTop: 5,
    flex: 1,
    justifyContent: "flex-end",  // Đảm bảo thông tin sản phẩm nằm dưới cùng
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#e74c3c",
    marginTop: 2,
  },
  productBrand: {
    fontSize: 12,
    color: "#666",
  },
});

export default Watch;
