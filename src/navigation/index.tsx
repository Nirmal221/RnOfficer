import React from 'react';
import {
  AppStackParamList,
  AuthStackParamList,
  RootStackParamList,
} from './types';
import { AppIcons } from '../assets';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OfficerListScreen from '../screens/OfficerListScreen/OfficerListScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';

const Stack = createStackNavigator<AuthStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<AppStackParamList>();

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

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <AppIcons.Home height={30} width={30} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            return <AppIcons.Profile />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const AppStackScreens = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="TabStack" component={TabStack} />
      <AppStack.Screen name="OfficerListScreen" component={OfficerListScreen} />
      <AppStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
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
