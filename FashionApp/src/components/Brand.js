import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Brand() {
  return (
    <View style={styles.container}>
      {/* Dòng kẻ ngang trên */}
      <View style={styles.separator} />

      <View style={styles.logoContainer}>
        {/* Nike */}
        <TouchableOpacity>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Adidas */}
        <TouchableOpacity>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Puma */}
        <TouchableOpacity>
          <Image
            source={{ uri: "https://1000logos.net/wp-content/uploads/2017/05/PUMA-Logo.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Balenciaga */}
        <TouchableOpacity>
          <Image
            source={{ uri: "https://www.liblogo.com/img-logo/ba6427b4b5-balenciaga-logo-balenciaga-svg-balenciaga-brand-logo-svg-fashion-company-svg.png" }}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      {/* Dòng kẻ ngang dưới */}
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "100%",
  },
  separator: {
    height: 2,
    width: "90%",  // Chiều rộng 90% để căn giữa
    backgroundColor: "#ccc",
    marginVertical: 10,  // Tạo khoảng cách với logo
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