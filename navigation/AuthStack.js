import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoResultScreen from '../screens/NoResultScreen';

// 原有页面
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SuccessfullyScreen from '../screens/SuccessfullyScreen';
import ResetSuccessScreen from '../screens/ResetSuccessScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import GoogleEmailScreen from '../screens/GoogleEmailScreen';
import MainHomeScreen from '../screens/MainHomeScreen';

// 你新加的页面
import SpecializationScreen from '../screens/SpecializationScreen';
import FilterScreen from '../screens/FilterScreen';
import JobListScreen from '../screens/JobListScreen';

// D 分支新增页面
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainHome"
      screenOptions={{ headerShown: false }}
    >

      {/* 主页 */}
      <Stack.Screen name="MainHome" component={MainHomeScreen} />

      {/* 你新增的页面 */}
      <Stack.Screen name="Specialization" component={SpecializationScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="JobList" component={JobListScreen} />
      <Stack.Screen name="NoResultScreen" component={NoResultScreen} />

      {/* 原有页面 */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Successfully" component={SuccessfullyScreen} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccessScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <Stack.Screen name="GoogleEmail" component={GoogleEmailScreen} />

      {/* Profile – 来自 D 的分支 */}
      <Stack.Screen name="Profile" component={ProfileScreen} />

    </Stack.Navigator>
  );
}
