import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toolbar from "../../components/Toolbar";
import Watch from "../../components/Watch";
import Profile from "../Profile/Profile";
import BottomNavBar from "../../components/BottomNavBar";
import { getProducts } from "../../services/productService";
import { getPendingOrderCount } from "../../services/orderService";
import { getCartCount } from "../../services/cartService";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isProfileVisible, setProfileVisible] = useState(false);
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

  useEffect(() => {
    fetchProducts();
    fetchPendingOrderCount();
    fetchCartItemCount();
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

      {/* Banner Section */}
      {/* <View style={styles.bannerContainer}>
        <Image
          source={{ uri: "https://example.com/shoe-image.png" }} // Replace with actual image URL
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>New Collection</Text>
          <Text style={styles.bannerSubtitle}>Đây là một đôi giày NGON.</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop now</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Categories Section */}
      {/* <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>
      <Brand onSelectBrand={setSelectedBrand} selectedBrand={selectedBrand} /> */}

      {/* Recommendation Section */}
      <Watch
        products={filteredProducts}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        scrollViewRef={scrollViewRef}
      />


      {/* Sử dụng BottomNavBar component */}
      <BottomNavBar
        toggleProfile={toggleProfile}
        cartItemCount={cartItemCount}
        onHomePress={scrollToTop}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  bannerContainer: {
    flexDirection: "row",
    backgroundColor: "#6342E8",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  bannerImage: {
    width: 120,
    height: 80,
    resizeMode: "contain",
  },
  bannerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 5,
  },
  shopNowButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  shopNowText: {
    color: "#6342E8",
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#6342E8",
  },
});

export default HomeScreen;