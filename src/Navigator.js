import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screen/home/Login';
import signup from './screen/home/signup';
import feed_home from './screen/dash/feed_home';
import { Categorie } from './screen/dash/Categorie';
import { feed_detail } from './screen/dash/feed_detail';
import { profile } from './screen/dash/profile';
import { HomeScreen } from './screen/home/HomeScreen';
import { Sidebar } from './screen/dash/Sidebar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {  StyleSheet, AsyncStorage } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Drawerscreen({ navigation }) {
  return (
    <Drawer.Navigator
     drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen name="feed_home"
            listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('profile');
          },
        })}
        component={feed_home} />
    </Drawer.Navigator>
  );
}


function Stackscreen({ navigation, route, props }) {
  return (
    <Stack.Navigator>
      <Stack.Screen style={styles.mid}   name="Drawerscreen" component={Drawerscreen} />
      <Stack.Screen style={styles.mid}   name="Categorie" component={Categorie} />
      <Stack.Screen name="feed_detail" component={feed_detail}/>
    </Stack.Navigator>
  );
}

function Tabscreen({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="feed_home"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#d3d0d2',
        activeBackgroundColor: '#245591',
        inactiveBackgroundColor: '#245591',
        labelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Stackscreen" component={Stackscreen}
        options={{
          title: 'Actualités',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={'#d3d0d2'} size={size} />
          ),
        }} />
      <Tab.Screen
        name="profile" component={profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" color={'#d3d0d2'} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}


function Navigator({ navigation }) {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="signup" component={signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Tabscreen" component={Tabscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator

const styles = StyleSheet.create({
  icons: {
    color: '#d3d0d2',
    marginLeft: 13,
    marginRight: 13,
  },
  mid: {
    justifyContent: 'center',
  }
}
);
