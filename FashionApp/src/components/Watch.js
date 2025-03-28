import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Watch = ({ products, loading }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
    padding: 15,
    backgroundColor: "#f0f0",
    borderWidth: 3,  
    borderColor: "#6342E8",  
    borderTopLeftRadius: 30,  
    borderTopRightRadius: 30, 
    borderBottomWidth: 0,  
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
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
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default Watch;
