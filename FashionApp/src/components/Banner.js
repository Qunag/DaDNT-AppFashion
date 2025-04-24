import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Banner = () => {
  const banners = [
    {
      image: "https://res.cloudinary.com/dgmy6mekk/image/upload/v1745421286/nike/AirForce1Black.jpg",
      title: "Air Force 1 Black",
      subtitle: "Phong cách mạnh mẽ, cá tính!",
    },
    {
      image: "https://res.cloudinary.com/dgmy6mekk/image/upload/v1743604738/d03hd2k6d3jwsvkibdz3.jpg",
      title: "Barreda White",
      subtitle: "Tinh tế và hiện đại.",
    },
    {
      image: "https://res.cloudinary.com/dfqdh40iu/image/upload/v1738909196/CA%20Pro%20Classic%20Trainers_Tr%E1%BA%AFng.webp",
      title: "CA Pro Classic",
      subtitle: "Sự kết hợp cổ điển và hiện đại.",
    },
    {
      image: "https://res.cloudinary.com/dgmy6mekk/image/upload/v1744121348/Balenciaga/Men%27s%20Hike%20Sneaker_white.png",
      title: "Men's Hike Sneaker",
      subtitle: "Độc đáo, không đụng hàng!",
    },
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        // Cuộn đến banner tiếp theo
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <View style={styles.bannerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ width: SCREEN_WIDTH * banners.length }}
      >
        {banners.map((banner, index) => (
          <View key={index} style={[styles.bannerItem, { width: SCREEN_WIDTH }]}>
            {banner.image ? (
              <Image
                source={{ uri: banner.image }}
                style={styles.bannerImage}
                resizeMode="contain"
                onError={(error) =>
                  console.log(`Image ${index} load error:`, error.nativeEvent.error)
                }
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={40} color="#999" />
                <Text style={styles.placeholderText}>Không có ảnh</Text>
              </View>
            )}
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentBannerIndex ? "#fff" : "#999" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#6342E8",
  },
  bannerItem: {
    flexDirection: "row",
    backgroundColor: "#6342E8",
    padding: 15,
    alignItems: "center",
  },
  bannerImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  imagePlaceholder: {
    width: 120,
    height: 80,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  bannerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Banner;