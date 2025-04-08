import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/Home/LoadingScreen';
import SplashScreen from './src/screens/Home/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPassWordScreen';
import SuccessScreen from "./src/screens/SuccessScreen";
import FailedScreen from "./src/screens/FailedScreen";
import HomeScreen from './src/screens/Home/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import Cart from './src/screens/Cart';
import EditProfileScreen from './src/screens/EditProfileScreen';
import EditProfileFormScreen from './src/screens/EditProfileFormScreen';
import CodeScreen from './src/screens/auth/CodeScreen';
import ResetPasswordScreen from './src/screens/auth/ResetPasswordScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import SearchResultsScreen from "./src/screens/SearchResultsScreen";
import Watch from './src/components/Watch';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="CodeScreen" component={CodeScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Failed" component={FailedScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="EditProfileForm" component={EditProfileFormScreen} />
        <Stack.Screen name="Watch" component={Watch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}