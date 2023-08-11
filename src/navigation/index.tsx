import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import OfficerListScreen from '../screens/OfficerListScreen/OfficerListScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

export type AppStackParamList = {
  HomeScreen: undefined;
  OfficerListScreen: { cityObj: { name: string } };
  ProfileScreen: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegistrationScreen: { userData: any };
};

export type RootStackParamList = {
  AuthStack: undefined;
  SplashScreen: undefined;
  AppStackScreens: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

const AppStackScreens = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="HomeScreen" component={HomeScreen} />
      <AppStack.Screen name="OfficerListScreen" component={OfficerListScreen} />
      <AppStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </AppStack.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="AppStackScreens" component={AppStackScreens} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
