import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Brand({ onSelectBrand, selectedBrand }) {
  const brands = [
    { name: "Nike", uri: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo-700x394.png" },
    { name: "Puma", uri: "https://1000logos.net/wp-content/uploads/2017/05/PUMA-Logo.png" },
    { name: "Adidas", uri: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png" },
    { name: "Balenciaga", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnVWH9yuCfRx6RlgAiQ9AVi-wx5fR4V_FwQ&s" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand.name}
            onPress={() => onSelectBrand(brand.name)}
            style={[
              styles.logoWrapper,
              selectedBrand === brand.name && styles.selectedLogoWrapper, // Áp dụng viền sáng khi chọn
            ]}
          >
            <Image source={{ uri: brand.uri }} style={styles.logo} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  logoWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0", // Màu nền mặc định
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2, // Đặt border
    borderColor: "#f0f0f0", // Màu viền mặc định
  },
  selectedLogoWrapper: {
    borderColor: "#6342E8", // Màu viền khi được chọn
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
