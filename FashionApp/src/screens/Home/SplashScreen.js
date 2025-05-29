import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import styles from '../../styles/Home/SplashStyles'; 

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton destination="Loading" />
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


export default SplashScreen;