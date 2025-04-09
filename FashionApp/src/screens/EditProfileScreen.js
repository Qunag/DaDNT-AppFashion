import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; 
import { getUserById } from '../services/userService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          if (!accessToken) {
            console.warn('Không tìm thấy accessToken');
            navigation.replace('LoginScreen');
            return;
          }
  
          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.sub || decodedToken.userId || decodedToken.id || decodedToken.user;
  
          if (!userId) {
            throw new Error('Không tìm thấy userId trong token');
          }
  
          const response = await getUserById(userId);
          setUserData(response);
          setLoading(false);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin người dùng:', error.message || error);
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [])
  );
  

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Không thể lấy thông tin người dùng.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ của tôi</Text>
        <Image
          source={{ uri: userData.avatarUrl || 'https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Tên</Text>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="#6B7280" />
          <Text style={styles.infoValue}>{userData.name}</Text>
        </View>

        <Text style={styles.sectionTitle}>Email</Text>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="#6B7280" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Số điện thoại</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={24} color="#6B7280" />
          <Text style={styles.infoValue}>{userData.phone}</Text>
        </View>

        <Text style={styles.sectionTitle}>Địa chỉ</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={24} color="#6B7280" />
          <Text style={styles.infoValue}>{userData.address}</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfileForm', { userData })}
        >
          <Text style={styles.editButtonText}>Sửa thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#6342E8',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#6342E8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
});

export default EditProfileScreen;