import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import TopUpScreen from '../screens/TopUpScreen';
import TransactionScreen from '../screens/TransactionScreen';
import AccountScreen from '../screens/AccountScreen';
// import TransaksiScreen from '../screens/TransaksiScreen'; // pastikan file ini ada
// import RiwayatScreen from '../screens/RiwayatScreen'; // pastikan file ini ada
// import ProfileScreen from '../screens/ProfileScreen'; // pastikan file ini ada

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          const icons = {
            Home: 'home-outline',
            TopUp: 'swap-horizontal',
            Transaksi: 'clock-time-four-outline',
            Akun: 'account-outline',
          };

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#e11d48',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TopUp" component={TopUpScreen} />
      <Tab.Screen name="Transaksi" component={TransactionScreen} />
      <Tab.Screen name="Akun" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
