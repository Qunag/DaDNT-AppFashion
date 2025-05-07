import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton />
      <Image source={require('../../assets/anh2.png')} style={styles.anh2} />
      <Image source={require('../../assets/anh4.png')} style={styles.anh4} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Panda</Text>
        <Text style={{ fontSize: 20, color: '#000', textAlign: 'center', fontWeight: 'bold', marginTop: 110 }}>Tạo phong cách thời trang {'\n'} theo cách riêng của bạn.</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 30, textAlign: 'center' }}>Mỗi người đàn ông và phụ nữ đều có phong cách riêng của mình, {'\n'} Panda giúp bạn tạo nên phong cách độc đáo của riêng mình.</Text>


        <CustomButton title="ĐĂNG NHẬP" type='fill' onPress={() => navigation.push('Login')} />
        <Text style={{ top: 98, fontSize: 14, fontWeight: 'bold' }}>--- HOẶC ---</Text>
        <CustomButton title="ĐĂNG KÝ" type='outline' onPress={() => navigation.push('Register')} />

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10, // nut này luon lên trên cùng

  },
  anh2: {
    flex: 1,
    resizeMode: 'contain',//Ảnh sẽ được co giãn hoặc co lại để vừa khít trong khung hiển thị mà vẫn giữ nguyên tỉ lệ chiều rộng và chiều cao ban đầu.
  },
  anh4: {
    flex: 1,
    width: 414,
    height: 875,
    position: 'absolute', // Đặt ảnh này lên trên anh 1
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    top: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    top: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SplashScreen;