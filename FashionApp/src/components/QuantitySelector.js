import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const QuantitySelector = ({ initialQuantity = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
    if (onChange) onChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      if (onChange) onChange(quantity - 1);
    }
  };

  const handleChange = (text) => {
    let value = parseInt(text) || 1;
    setQuantity(value);
    if (onChange) onChange(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrease}>
        <Text>−</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(quantity)}
        onChangeText={handleChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  button: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    width: 30,
    textAlign: "center",
    fontSize: 16,
    padding: 5,
    backgroundColor: "white",
  },
});

export default QuantitySelector;
