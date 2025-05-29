import React from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../../styles/Home/SearchStyles"; 

const SearchResultsScreen = () => {
    const route = useRoute();
    const { results } = route.params || { results: [] }; // Đảm bảo có dữ liệu đầu vào

    if (!results || results.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noResultsText}>Không có sản phẩm nào khớp với tìm kiếm của bạn.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kết quả tìm kiếm</Text>
            <FlatList
                data={results}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => {
                    const imageUrl = item.colors?.[0]?.image_url || "https://via.placeholder.com/100"; // Ảnh mặc định nếu không có
                    return (
                        <View style={styles.productItem}>
                            <Image source={{ uri: imageUrl }} style={styles.productImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text>{item.brand}</Text>
                            <Text>{item.price.toLocaleString()} VND</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};



export default SearchResultsScreen;
