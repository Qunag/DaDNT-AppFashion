import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_HEIGHT = SCREEN_WIDTH * (9 / 16); // Tỉ lệ 16:9

const allBanners = [
  { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZsX9CZ5JF98NBnzhTBxocAf6Zd8sl3xz7w&s" },
  { uri: "https://example.com/image-that-does-not-exist.jpg" }, // ảnh lỗi
  { uri: "https://example.com/image.jpg" },
  { uri: null }, // giả sử lỗi
];

const Banner = () => {
  const scrollViewRef = useRef(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({}); // key: index, value: true nếu lỗi

  const validBanners = allBanners.filter((banner, index) => banner?.uri || imageErrors[index] === true);

  useEffect(() => {
    if (validBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % validBanners.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);

        return () => clearInterval(interval);
  }, [validBanners.length]);

  if (validBanners.length === 0) {
    return null;
  }

  return (
    <View style={styles.bannerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ width: SCREEN_WIDTH * validBanners.length }}
        scrollEnabled={validBanners.length > 1}
      >
        {allBanners.map((banner, index) => (
          <View key={index} style={[styles.bannerItem, { width: SCREEN_WIDTH }]}>
            {banner.uri && !imageErrors[index] ? (
              <Image
                source={{ uri: banner.uri }}
                style={styles.bannerImage}
                resizeMode="cover"
                onError={() => {
                  setImageErrors(prev => ({ ...prev, [index]: true }));
                }}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={40} color="#999" />
                <Text style={styles.placeholderText}>Không tải được hình</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {validBanners.length > 1 && (
        <View style={styles.dotsContainer}>
          {validBanners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentBannerIndex ? "#fff" : "#999",
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  bannerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
    backgroundColor: "#f0f0f0",
  },
  imagePlaceholder: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 8,
    color: "#999",
    fontSize: 14,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Banner;
