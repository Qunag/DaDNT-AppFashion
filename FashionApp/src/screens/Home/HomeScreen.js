import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import axios from "axios";
import Toolbar from "../../components/Toolbar";
import Brand from "../../components/Brand";
import Watch from "../../components/Watch";
import Profile from "../Profile/Profile";
import { getProducts } from "../../services/productService";

import { getPendingOrderCount } from "../../services/orderService"; // Import hàm getPendingOrderCount
import { getCartCount } from "../../services/cartService"; // Import hàm getCartCount từ cartService


const HomeScreen = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const profileAnim = useRef(new Animated.Value(-250)).current;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [pendingOrderCount, setPendingOrderCount] = useState(0); // State cho số lượng đơn hàng chưa hoàn thành
  const [cartItemCount, setCartItemCount] = useState(0); // State cho số lượng sản phẩm trong giỏ hàng

  const [refreshing, setRefreshing] = useState(false);

  // Lấy sản phẩm từ server
  const fetchProducts = async () => {
    try {

      const data = await getProducts(); 
      if (data?.results) {
        setProducts(data.results);
      } else {
        console.warn("Không có 'results' trong dữ liệu:", data);
        setProducts([]);
      }

    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Lấy số lượng đơn hàng chưa hoàn thành
  const fetchPendingOrderCount = async () => {
    try {
      const count = await getPendingOrderCount();
      setPendingOrderCount(count);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng đơn hàng chờ xử lý:", error.message);
    }
  };

  // Lấy số lượng sản phẩm trong giỏ hàng
  const fetchCartItemCount = async () => {
    try {
      const count = await getCartCount();
      setCartItemCount(count);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng sản phẩm trong giỏ hàng:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchPendingOrderCount(); // Gọi hàm để lấy số lượng đơn hàng chờ xử lý
    fetchCartItemCount(); // Gọi hàm để lấy số lượng sản phẩm trong giỏ hàng
  }, []);

  const toggleProfile = () => {
    const toValue = isProfileVisible ? -250 : 0;
    Animated.timing(profileAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setProfileVisible(!isProfileVisible);
  };

  // Khi tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedBrand(null);
  };

  // Khi người dùng vuốt để làm mới
  const handleRefresh = () => {
    setRefreshing(true);
    setSearchTerm(""); // Xóa tìm kiếm
    setSelectedBrand(null); // Xóa thương hiệu
    fetchProducts(); // Gọi lại API
  };

  // Lọc sản phẩm theo tìm kiếm và thương hiệu
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBrand = selectedBrand
      ? item.brand.toLowerCase() === selectedBrand.toLowerCase()
      : true;

    return matchesSearch && matchesBrand;
  });

  return (
    <View style={styles.container}>
      <Toolbar
        toggleProfile={toggleProfile}
        onSearch={handleSearch}
        pendingOrderCount={pendingOrderCount}
        cartItemCount={cartItemCount}
      />
      <Profile
        isVisible={isProfileVisible}
        toggleProfile={toggleProfile}
        profileAnim={profileAnim}
      />
      <Brand onSelectBrand={setSelectedBrand} />

      <Watch
        products={filteredProducts}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
});

export default HomeScreen;
