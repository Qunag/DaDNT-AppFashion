import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getProducts } from "../services/productService"; // Import hàm getProducts từ service

const Watch = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);  // Lưu trữ sản phẩm
  const [loading, setLoading] = useState(true);  // Trạng thái loading
  const [page, setPage] = useState(1);  // Quản lý phân trang
  const [limit, setLimit] = useState(10);  // Giới hạn số lượng sản phẩm trên mỗi trang
  const [totalPages, setTotalPages] = useState(0);  // Tổng số trang

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts(page, limit); // Gọi API với trang và giới hạn
        setProducts(response.results);  // Lưu sản phẩm vào state
        setTotalPages(response.totalPages);  // Lưu tổng số trang
      } catch (error) {
        console.error("Lỗi tải sản phẩm từ API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Gọi hàm khi trang đầu tiên được tải
  }, [page, limit]);  // Tải lại khi `page` thay đổi

  // Hàm để xử lý khi người dùng chọn một trang
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);  // Cập nhật trang hiện tại
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách sản phẩm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}  // Hiển thị các sản phẩm
          keyExtractor={(item) => item._id.toString()} // Sử dụng _id nếu có
          numColumns={2} // Hiển thị 2 cột
          renderItem={({ item }) => {
            const firstColor = item.colors && item.colors.length > 0 ? item.colors[0] : null;
            return (
              <TouchableOpacity
                style={styles.productItem}
                onPress={() => navigation.navigate("ProductDetail", { productId: item._id })}
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
                  <Text style={styles.productPrice}>
                    Giá: {item.price ? item.price.toLocaleString("vi-VN") + " VNĐ" : "Đang cập nhật..."}
                  </Text>
                  <Text style={styles.productBrand}>Thương hiệu: {item.brand}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
    height: 230, // Cố định chiều cao cho từng item
  },
  productImage: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
  },
  productInfo: {
    alignItems: "center",
    marginTop: 10,
    flex: 1,
    justifyContent: "flex-end",
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#6342E8",
    borderRadius: 5,
  },
  pageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  activePageButton: {
    backgroundColor: "#4a29e3",  // Màu nền khi trang được chọn
  },
});

export default Watch;
