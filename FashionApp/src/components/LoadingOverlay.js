import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

// Component LoadingOverlay
const LoadingOverlay = ({ visible, duration = 2000, onFinish }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish(); // Gọi callback khi kết thúc
      }, duration);
      return () => clearTimeout(timer); // Dọn dẹp timer
    }
  }, [visible, duration, onFinish]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={() => { }}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#6342E8" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màn hình đen mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;