import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import Toolbar from "../../components/Toolbar";
import Watch from "../../components/Watch";
import Profile from "../Profile/Profile";
import BottomNavBar from "../../components/BottomNavBar";
import LoadingOverlay from "../../components/LoadingOverlay"; // Import LoadingOverlay
import { getProducts } from "../../services/productService";
import { getPendingOrderCount } from "../../services/orderService";
import { getCartCount } from "../../services/cartService";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "../../styles/Home/HomeStyles"; // Import styles

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State cho loading overlay
  const [loadingCallback, setLoadingCallback] = useState(null); // Lưu callback
  const profileAnim = useRef(new Animated.Value(-250)).current;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      if (data?.results) {
        setProducts(data.results);
      } else {
        console.warn("No 'results' in data:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchPendingOrderCount = async () => {
    try {
      const count = await getPendingOrderCount();
      setPendingOrderCount(count);
    } catch (error) {
      console.error("Error fetching pending order count:", error.message);
    }
  };

  const fetchCartItemCount = async () => {
    try {
      const count = await getCartCount();
      setCartItemCount(count);
    } catch (error) {
      console.error("Error fetching cart item count:", error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCartItemCount();
      fetchPendingOrderCount();
    }, [])
  );

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
  

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedBrand(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSearchTerm("");
    setSelectedBrand(null);
    fetchProducts();
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleNavigation = (screen) => {
    setIsLoading(true);
    setLoadingCallback(() => () => {
      navigation.navigate(screen);
    });
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
        pendingOrderCount={pendingOrderCount}
        cartItemCount={cartItemCount}
      />
      <Profile
        isVisible={isProfileVisible}
        toggleProfile={toggleProfile}
        profileAnim={profileAnim}
      />

      <Watch
        products={filteredProducts}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        scrollViewRef={scrollViewRef}
      />

      <BottomNavBar
        toggleProfile={toggleProfile}
        cartItemCount={cartItemCount}
        onHomePress={scrollToTop}
        onNavigate={handleNavigation} // Truyền hàm handleNavigation
      />
    </View>
  );
};


export default HomeScreen;