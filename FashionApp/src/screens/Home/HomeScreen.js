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
  const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm
  const [selectedBrand, setSelectedBrand] = useState(null); // Thương hiệu đã chọn


  useEffect(() => {
    axios
      .get("http://192.168.1.242:3000/v1/products")
      .then((response) => {
        setProducts(response.data.results); // Đảm bảo đúng cấu trúc dữ liệu
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
        setLoading(false);
      });
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

  // Khi tìm kiếm, xóa bộ lọc thương hiệu
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedBrand(null); // Xóa bộ lọc thương hiệu khi tìm kiếm
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm và thương hiệu (nếu có)
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBrand = selectedBrand ? item.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
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
      <Watch products={filteredProducts} loading={loading} /> 
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
