import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Core auth/onboarding
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

// Main experience
import MainHomeScreen from '../screens/MainHomeScreen';
import SpecializationScreen from '../screens/SpecializationScreen';
import FilterScreen from '../screens/FilterScreen';
import JobListScreen from '../screens/JobListScreen';
import NoResultScreen from '../screens/NoResultScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import MyApplicationsScreen from '../screens/MyApplicationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CoursePromoScreen from '../screens/CoursePromoScreen';

// Messages & Chat
import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';

// 你新建的“申请详情”页面
import ApplicationDetailScreen from '../screens/ApplicationDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* Auth & onboarding */}
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

      {/* Main app */}
      <Stack.Screen name="MainHome" component={MainHomeScreen} />
      <Stack.Screen name="Specialization" component={SpecializationScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="JobList" component={JobListScreen} />
      <Stack.Screen name="NoResultScreen" component={NoResultScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />

      {/* ✅ 新增：从 MyApplications 点 View → ApplicationDetail */}
      <Stack.Screen name="ApplicationDetail" component={ApplicationDetailScreen} />

      <Stack.Screen name="MyApplications" component={MyApplicationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="CoursePromo" component={CoursePromoScreen} />

      {/* Messages & Chat */}
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
