import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import axios from "axios";
import Toolbar from "../../components/Toolbar";
import Brand from "../../components/Brand";
import Watch from "../../components/Watch";
import Profile from "../Profile";

const HomeScreen = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const profileAnim = useRef(new Animated.Value(-250)).current;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [refreshing, setRefreshing] = useState(false); // 👈 NEW

  // 📥 Load sản phẩm từ server
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.0.101:3000/v1/products");
      setProducts(response.data.results);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // 👈 Đảm bảo dừng animation refresh
    }
  };

  useEffect(() => {
    fetchProducts();
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

  // 🔍 Khi tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedBrand(null);
  };

  // 🔄 Khi người dùng vuốt để làm mới
  const handleRefresh = () => {
    setRefreshing(true);
    setSearchTerm("");      // Xóa tìm kiếm
    setSelectedBrand(null); // Xóa thương hiệu
    fetchProducts();        // Gọi lại API
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
      <Toolbar toggleProfile={toggleProfile} onSearch={handleSearch} />
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
    paddingTop: 45,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
});

export default HomeScreen;
