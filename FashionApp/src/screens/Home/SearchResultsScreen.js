import React from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    noResultsText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
    },
    productItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SearchResultsScreen;
