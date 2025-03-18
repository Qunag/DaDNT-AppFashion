import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

// const products = [
//   { id: "1", name: "Sản phẩm 1",cost: '1500000', image: "https://res-console.cloudinary.com/dfqdh40iu/media_explorer_thumbnails/910475c266b6bda96924172fe6ddc6d3/detailed" },
//   { id: "2", name: "Sản phẩm 2",cost: '1500000', image: "https://res-console.cloudinary.com/dfqdh40iu/media_explorer_thumbnails/910475c266b6bda96924172fe6ddc6d3/detailed" },
//   { id: "3", name: "Sản phẩm 3",cost: '1500000', image: "https://res-console.cloudinary.com/dfqdh40iu/media_explorer_thumbnails/910475c266b6bda96924172fe6ddc6d3/detailed" },
//   { id: "4", name: "Sản phẩm 4",cost: '1500000', image: "https://res-console.cloudinary.com/dfqdh40iu/media_explorer_thumbnails/910475c266b6bda96924172fe6ddc6d3/detailed" },
//   { id: "5", name: "Sản phẩm 5",cost: '1500000', image: "https://res-console.cloudinary.com/dfqdh40iu/media_explorer_thumbnails/910475c266b6bda96924172fe6ddc6d3/detailed" },
//   { id: "6", name: "Sản phẩm 6",cost: '1500000', image: "https://res-console.cloudinary.com/dfqdh40iu/media_explorer_thumbnails/910475c266b6bda96924172fe6ddc6d3/detailed" },
// ];

const Watch = () => {
  const handlePress = (item) => {
    Alert.alert("Thông báo", `Bạn đã chọn ${item.name}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.cost}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2} // Hiển thị 2 cột
      columnWrapperStyle={styles.row} // Cách dòng giữa các cột
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  itemContainer: {
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
  image: {
    width: 80,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Watch;