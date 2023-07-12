import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OfficerListScreen from '../screens/OfficerListScreen/OfficerListScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';

export type AppStackParamList = {
  HomeScreen: undefined;
  OfficerListScreen: { cityObj: { name: string } };
};

const Stack = createStackNavigator();
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStackScreens" component={AppStackScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
