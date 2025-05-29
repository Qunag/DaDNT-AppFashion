import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../../components/ButtonLoading';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../../components/LoadingOverlay';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCallback, setLoadingCallback] = useState(null);

  const handleButtonPress = () => {
    setIsLoading(true);
    setLoadingCallback(() => () => {
      navigation.push('Splash');
    });
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay
        visible={isLoading}
        duration={500}
        onFinish={loadingCallback}
      />

      <Image source={require('../../assets/anh3.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Panda</Text>
        <CustomButton
          title="SHOP NOW"
          type="outline"
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
};

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
    bottom: 150,
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoadingScreen;