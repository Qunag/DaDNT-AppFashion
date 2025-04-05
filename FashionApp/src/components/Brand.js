import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Brand({ onSelectBrand }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Nike */}
        <TouchableOpacity onPress={() => onSelectBrand("Nike")}>
          <Image
            source={{ uri: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo-700x394.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Adidas */}
        <TouchableOpacity onPress={() => onSelectBrand("Adidas")}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Puma */}
        <TouchableOpacity onPress={() => onSelectBrand("Puma")}>
          <Image
            source={{ uri: "https://1000logos.net/wp-content/uploads/2017/05/PUMA-Logo.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Balenciaga */}
        <TouchableOpacity onPress={() => onSelectBrand("Balenciaga")}>
          <Image
            source={{ uri: "https://www.liblogo.com/img-logo/ba6427b4b5-balenciaga-logo-balenciaga-svg-balenciaga-brand-logo-svg-fashion-company-svg.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "100%",
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "100%",
    paddingVertical: 10,  // Khoảng cách giữa logo và dòng kẻ
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
