import React from "react";
import {View,Text,StyleSheet,FlatList,ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";

const Watch = ({ products, loading, refreshing, onRefresh }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item._id })
      }
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách sản phẩm</Text>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id?.toString()}
          numColumns={2}
          renderItem={renderItem}
          refreshing={refreshing}     // Cờ để hiện "kéo để làm mới"
          onRefresh={onRefresh}       // Hàm xử lý khi người dùng vuốt xuống
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Không có sản phẩm nào.
            </Text>
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8",
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
  },
});

export default Watch;
