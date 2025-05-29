import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import LoadingScreen from './src/screens/Home/LoadingScreen';
import SplashScreen from './src/screens/Home/SplashScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPassWordScreen';
import SuccessScreen from './src/screens/Buy/SuccessScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import ProductDetailScreen from './src/screens/Home/ProductDetailScreen';
import Cart from './src/screens/Buy/Cart';
import EditProfileScreen from './src/screens/Profile/EditProfileScreen';
import EditProfileFormScreen from './src/screens/Profile/EditProfileFormScreen';
import CodeScreen from './src/screens/Auth/CodeScreen';
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen';
import CheckoutScreen from './src/screens/Buy/CheckoutScreen';
import SearchResultsScreen from './src/screens/Home/SearchResultsScreen';
import Watch from './src/components/Watch';
import OrderScreen from './src/screens/Buy/OrderScreen';
import NoticeOrderScreen from './src/screens/Buy/NoticeOrderScreen';
import OrderDetailScreen from './src/screens/Buy/OrderDetailScreen';
import ChangePasswordScreen from './src/screens/Profile/ChangePasswordScreen';
import Toast from 'react-native-toast-message';
import NoInternetNotice from './src/components/NoInternetNotice';


const Stack = createStackNavigator();

const linking = {
  prefixes: ['appfashion://', Linking.createURL('/')],
  config: {
    screens: {
      Loading: 'loading',
      Splash: 'splash',
      Login: 'login',
      Register: 'register',
      ForgotPassword: 'forgot-password',
      CodeScreen: 'code',
      ResetPasswordScreen: 'reset-password/:token',
      Success: 'success',
      Home: 'home',
      SearchResults: 'search',
      ProductDetail: 'product/:id',
      Cart: 'cart',
      Checkout: 'checkout',
      EditProfile: 'edit-profile',
      EditProfileForm: 'edit-profile-form',
      Watch: 'watch',
      Order: 'order',
      NoticeOrder: 'notice-order',
      OrderDetail: 'order-detail/:id',
      ChangePassword: 'change-password',
    },
  },
};

export default function App() {
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      console.log('Deep link received:', url);
      if (url) {
        // Phân tích URL để kiểm tra scheme và path
        const parsedUrl = Linking.parse(url);
        console.log('Parsed URL:', parsedUrl);
        Toast.show({
          type: 'info',
          text1: 'Deep Link',
          text2: `Received URL: ${url}`,
        });
        // Xử lý tùy chỉnh nếu cần
        if (parsedUrl.path === 'reset-password' && parsedUrl.queryParams?.token) {
          console.log('Reset Password Token:', parsedUrl.queryParams.token);
        }
      }
    };

    // Lắng nghe sự kiện deep link
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Kiểm tra URL ban đầu
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Dọn dẹp listener
    return () => subscription.remove();
  }, []);

  return (
    <>
      <NoInternetNotice />
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="CodeScreen" component={CodeScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="EditProfileForm" component={EditProfileFormScreen} />
          <Stack.Screen name="Watch" component={Watch} />
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="NoticeOrder" component={NoticeOrderScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}