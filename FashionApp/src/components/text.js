import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ text, size }) => {
  return <Text style={[styles.text, { fontSize: size }]}>{text}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});
