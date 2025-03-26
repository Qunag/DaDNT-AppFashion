import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, FlatList, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import Toolbar from "../components/Toolbar";
import Brand from "../components/Brand";
import Watch from "../components/Watch";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isProfileVisible, setProfileVisible] = useState(false);
  const profileAnim = useRef(new Animated.Value(-250)).current;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
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

  return (
    <View style={styles.container}>
      <Toolbar toggleProfile={toggleProfile} />
      <Profile isVisible={isProfileVisible} toggleProfile={toggleProfile} profileAnim={profileAnim} />
      <Brand />
      <Text style={styles.text}>Danh sách sản phẩm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2} // Hiển thị 2 cột
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
            >
              {/* Hiển thị ảnh sản phẩm */}
              <Image source={{ uri: item.colors[0].image_url }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Giá: {item.price} VNĐ</Text>
                <Text style={styles.productBrand}>Thương hiệu: {item.brand}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      )}
 

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  text: {
    fontSize: 20,
    color: "black",
    marginTop: 20,
    textAlign: "center",
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
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#e74c3c",
  },
  productBrand: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;