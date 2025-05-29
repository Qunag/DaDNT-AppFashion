import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const NoInternetNotice = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const currentlyConnected = state.isConnected;
      if (currentlyConnected !== isConnected) {
        if (!currentlyConnected && !firstLoad) {
          Toast.show({
            type: 'error',
            text1: '🚫 Không có kết nối Internet',
            position: 'bottom',
            visibilityTime: 2000,
          });
        }

        if (currentlyConnected && !firstLoad) {
          Toast.show({
            type: 'success',
            text1: '✅ Đã kết nối Internet',
            position: 'bottom',
            visibilityTime: 2000,
          });
        }

        setIsConnected(currentlyConnected);
        setFirstLoad(false);
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

  if (isConnected) return null;

  // Khi không có mạng: render lớp phủ bắt chạm và show toast mỗi khi chạm
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Toast.show({
          type: 'error',
          text1: '🚫 Không có kết nối Internet',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }}
    >
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
});

export default NoInternetNotice;
