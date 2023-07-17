import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OfficerListScreen from '../screens/OfficerListScreen/OfficerListScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

export type AppStackParamList = {
  HomeScreen: undefined;
  OfficerListScreen: { cityObj: { name: string } };
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

const Stack = createStackNavigator();
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
