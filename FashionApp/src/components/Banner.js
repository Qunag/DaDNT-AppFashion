import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_HEIGHT = SCREEN_WIDTH * (9 / 16);

const initialBanners = [
  { uri: "https://i.pinimg.com/736x/64/a5/95/64a59515ffcf7b852a7b3d01f6445477.jpg" },
  { uri: "https://i.pinimg.com/736x/2e/2f/c7/2e2fc723669c2022d584b85fdcabb944.jpg" },
  { uri: "https://i.pinimg.com/736x/38/33/e3/3833e32a6336c767a0ca1eb3e333d5c8.jpg" },
  { uri: null },
];

const Banner = () => {
  const scrollViewRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Lọc chỉ các banners hợp lệ
  const validBanners = initialBanners
    .map((banner, index) => ({ ...banner, originalIndex: index }))
    .filter((banner) => banner.uri && !imageErrors[banner.originalIndex]);

  useEffect(() => {
    if (validBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % validBanners.length;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * SCREEN_WIDTH,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [validBanners.length]);

  if (validBanners.length === 0) {
    return (
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={40} color="#999" />
        <Text style={styles.placeholderText}>Không có banner</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.bannerContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{
            width: SCREEN_WIDTH * validBanners.length,
          }}
          scrollEnabled={validBanners.length > 1}
          scrollEventThrottle={16}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setCurrentBannerIndex(index);
          }}
        >
          {validBanners.map((banner, index) => (
            <View key={index} style={[styles.bannerItem, { width: SCREEN_WIDTH }]}>
              <Image
                source={{ uri: banner.uri }}
                style={styles.bannerImage}
                resizeMode="cover"
                onError={() => {
                  setImageErrors((prev) => ({ ...prev, [banner.originalIndex]: true }));
                }}
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
                    backgroundColor: index === currentBannerIndex ? "#fff" : "#999",
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: -15,
    marginRight: -15,
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    alignSelf: "flex-start",
  },
  bannerItem: {
    justifyContent: "center",
    alignItems: "center",
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
