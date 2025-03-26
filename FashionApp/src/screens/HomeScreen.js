import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import axios from "axios";
import Toolbar from "../components/Toolbar";
import Brand from "../components/Brand";
import Watch from "../components/Watch";
import Profile from "./Profile";

const HomeScreen = () => {
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

      <Watch products={products} loading={loading} />

     
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
