import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_HEIGHT = SCREEN_WIDTH * (9 / 16);

const initialBanners = [
  { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZsX9CZ5JF98NBnzhTBxocAf6Zd8sl3xz7w&s" },
  { uri: "https://scontent.fhan5-6.fna.fbcdn.net/v/t1.15752-9/489730579_669715899197275_152952505542692274_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=U6jsfRxKbnEQ7kNvwHgvuFj&_nc_oc=Adm40zBavPuoKVGouoCbC7X63EDWyMqzzbjq7wPl_ZkXpWiXMn_xKz6g5NYXs_7KAxY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fhan5-6.fna&oh=03_Q7cD2QG5DIYg5vWq26fHb2BKwoC83CcndrOT3Lyu11-w-WHxjQ&oe=685FCC09" },
  { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaf_e7v-FyOfDVswXesJXpy8HkKXAgpG8yQ&s" },
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
        <Text style={styles.placeholderText}>Không có banner hợp lệ</Text>
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
