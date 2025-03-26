import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../../components/ButtonLoading';
import { useNavigation } from '@react-navigation/native';


const LoadingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/anh3.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Panda</Text>
        <CustomButton title="SHOP NOW" type='outline' onPress={() => navigation.push('Splash')} />

      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 150, // Đẩy text & button lên 100px từ bottom
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20, // Tạo khoảng cách giữa title và button
  },
});