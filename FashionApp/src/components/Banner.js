import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_HEIGHT = SCREEN_WIDTH * (9 / 16); // Tỉ lệ 16:9

const Banner = () => {
  // Danh sách banner, có thể chứa null nếu ảnh lỗi
  const allBanners = [
    { image: require("../assets/nike.jpg") },
    { image: require("../assets/nike.jpg") },
    { image: null }, // Giả sử ảnh lỗi
    { image: require("../assets/image.jpg") },
  ];

  // Lọc ảnh hợp lệ
  const validBanners = allBanners.filter(banner => !!banner.image);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (validBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => {
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

  // Nếu không có ảnh hợp lệ, ẩn banner
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
        {validBanners.map((banner, index) => (
          <View key={index} style={[styles.bannerItem, { width: SCREEN_WIDTH }]}>
            <Image
              source={banner.image}
              style={styles.bannerImage}
              resizeMode="cover"
            />
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
