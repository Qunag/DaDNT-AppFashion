import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList, Animated, RefreshControl, // Thêm RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";
import Brand from "./Brand";
import Banner from "./Banner";

const Watch = ({ products, loading, refreshing, onRefresh, selectedBrand, onSelectBrand,}) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showStickyBrand, setShowStickyBrand] = useState(false);

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item._id })
      }
    />
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 150 && !showStickyBrand) {
      setShowStickyBrand(true);
    } else if (offsetY <= 150 && showStickyBrand) {
      setShowStickyBrand(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Brand sticky ở top nếu scroll lên qua banner */}
      {showStickyBrand && (
        <View style={styles.stickyBrand}>
          <Brand selectedBrand={selectedBrand} onSelectBrand={onSelectBrand} />
        </View>
      )}

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={["#0000ff"]} 
              tintColor="#0000ff"
            />
          }
        >
          <View style={styles.container}>
            <Banner />
            <Text style={styles.sectionTitle}>Categories</Text>
            {!showStickyBrand && (
              <Brand
                selectedBrand={selectedBrand}
                onSelectBrand={onSelectBrand}
              />
            )}
            <Text style={styles.text}>Danh sách sản phẩm</Text>

            <FlatList
              data={products}
              keyExtractor={(item) => item._id?.toString()}
              numColumns={2}
              renderItem={renderItem}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  Không có sản phẩm nào.
                </Text>
              }
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    textAlign: "left",
  },
  stickyBrand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Watch;