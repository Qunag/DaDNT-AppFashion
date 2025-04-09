import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notification = ({ count }) => {
  if (!count || count <= 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>
        {count > 9 ? "9+" : count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 20, // Tăng kích thước để giống hình
    height: 20,
    borderRadius: 10, // Hình tròn
    position: "absolute",
    top: -8, // Điều chỉnh vị trí để badge nằm đúng chỗ
    right: -8,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    color: "white",
    fontSize: 12, // Tăng font size để dễ đọc hơn
    fontWeight: "bold",
  },
});

export default Notification;