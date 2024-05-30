import React, { useContext } from 'react';
import {
  AppStackParamList,
  AuthStackParamList,
  RootStackParamList,
} from './types';
import { colors } from '../themes';
import { AppIcons } from '../assets';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TalukaRegistrationScreen from '../screens/RegistrationScreen/TalukaRegistrationScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import { Context } from '../AppContext/AppContext';

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
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="TalukaRegistrationScreen"
        component={TalukaRegistrationScreen}
      />
    </Stack.Navigator>
  );
};

function TabStack() {
  const { theme } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme === 'light' ? colors.secondary : colors.black,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AppIcons.Home
              height={30}
              width={30}
              color={
                focused
                  ? theme === 'light'
                    ? colors.black
                    : colors.secondary
                  : colors.grey
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AppIcons.Profile
              height={30}
              width={30}
              color={focused ? colors.black : colors.grey}
            />
          ),
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
