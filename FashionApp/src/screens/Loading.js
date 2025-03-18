
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/ButtonLoading';
import { useNavigation } from '@react-navigation/native';


const LoadingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/anh3.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Panda</Text>
        <CustomButton title="SHOP NOW" type='outline' onPress={() => navigation.push('Splash')} />

      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoadingScreen;
