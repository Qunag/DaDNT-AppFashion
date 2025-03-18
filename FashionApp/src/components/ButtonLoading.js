import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, type }) => {
  return (
    <TouchableOpacity style={type === 'outline'? styles.outline : styles.fill} onPress={onPress}>
      <Text style={[{ color: type === 'outline' ? 'white' : 'black' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  outline: {
    top: 50,
    backgroundColor: 'transparent',
    padding: 15,
    width: 222,
    height: 54,
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'white',
    borderRadius : 56,
    borderWidth: 3,
    fontWeight: 'bold',
    fontSize: 11,
  },
  fill: {
    top: 100,
    backgroundColor: '#6342E8',
    padding: 15,
    width: 222,
    height: 54,
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#6342E8',
    borderRadius: 56,
    borderWidth: 3,
    fontWeight: 'bold',
    fontSize: 11,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
