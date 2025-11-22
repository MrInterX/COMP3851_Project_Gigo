// navigation/AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; // ⭐ 新增
import SuccessfullyScreen from '../screens/SuccessfullyScreen';
import ResetSuccessScreen from '../screens/ResetSuccessScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import GoogleEmailScreen from '../screens/GoogleEmailScreen';
import MainHomeScreen from '../screens/MainHomeScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword"component={ForgotPasswordScreen}/>
      <Stack.Screen name="Successfully" component={SuccessfullyScreen} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccessScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <Stack.Screen name="GoogleEmail" component={GoogleEmailScreen} />
      <Stack.Screen name="MainHome" component={MainHomeScreen} />

    </Stack.Navigator>
  );
}
