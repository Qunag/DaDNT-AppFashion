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
  const [refreshing, setRefreshing] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.0.101:3000/v1/products");
      setProducts(response.data.results);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await axios.get("http://192.168.0.101:3000/v1/carts/item");
      setCartCount(response.data.length);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
    }
  };


  const refreshCartCount = () => {
    fetchCartCount();
  };

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedBrand(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSearchTerm("");
    setSelectedBrand(null);
    fetchProducts();
    fetchCartCount();
  };

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
        cartCount={cartCount}
        refreshCartCount={refreshCartCount} 
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
        refreshCartCount={refreshCartCount} 
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