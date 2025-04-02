import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/Home/LoadingScreen';
import SplashScreen from './src/screens/Home/SplashScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPassWordScreen';
import SuccessScreen from "./src/screens/SuccessScreen";
import FailedScreen from "./src/screens/FailedScreen";
import HomeScreen from './src/screens/Home/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import Cart from './src/screens/Cart';
import EditProfileScreen from './src/screens/EditProfileScreen';
import CodeScreen from './src/screens/Auth/CodeScreen';
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen';



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
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}