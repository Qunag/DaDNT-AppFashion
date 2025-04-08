// Ví dụ về component QuantitySelector
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function QuantitySelector({ value, onChange }) {
  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    onChange(value + 1);
  };

  // Đảm bảo value luôn là số
  const displayValue = typeof value === 'number' ? value : 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{displayValue}</Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  button: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#e0e0e0", justifyContent: "center", alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  quantity: { marginHorizontal: 10, fontSize: 16 },
});