import {useEffect,useState} from 'react'
import * as React  from 'react'


import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screen/home/Login';
import signup from './screen/home/signup';
import feed_home from './screen/dash/feed_home';
import editprofile from '../src/screen/dash/editprofile'

import { Categorie } from './screen/dash/Categorie';
import { feed_detail } from './screen/dash/feed_detail';
import { feed_comments } from './screen/dash/feed_comments';
import { feed_addcomments } from './screen/dash/feed_addcomments';
import { filterbynumberrate } from './screen/dash/filtrage/filterbynumberrate';
import { filterbyratenumber } from './screen/dash/filtrage/filterbyratenumber';
import { filterbycomments } from './screen/dash/filtrage/filterbycomments';

import { filterday } from './screen/dash/filtragebydate/filterday';
import { filtersemaine } from './screen/dash/filtragebydate/filtersemaine';
import { filtermonth } from './screen/dash/filtragebydate/filtermonth';


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
      <Stack.Screen name="feed_comments" component={feed_comments}/>
      <Stack.Screen name="feed_addcomments" component={feed_addcomments}/>
      <Stack.Screen name="filterbynumberrate" component={filterbynumberrate}/>
      <Stack.Screen name="filterbyratenumber" component={filterbyratenumber}/>
      <Stack.Screen name="filterbycomments" component={filterbycomments}/>
      <Stack.Screen name="filterday" component={filterday}/>
      <Stack.Screen name="filtersemaine" component={filtersemaine}/>
      <Stack.Screen name="filtermonth" component={filtermonth}/>
    </Stack.Navigator>
  );
}


function profilescreens({ navigation, route, props }) {
  return (
    <Stack.Navigator>
 
 <Stack.Screen
        name="profile" component={profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" color={'#d3d0d2'} size={size} />
          ),
        }} />
        
              <Stack.Screen name="editprofile" component={editprofile}/>
 
    </Stack.Navigator>
  );
}



function Tabscreen({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Stackscreen"
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
        name="profilescreens" component={profilescreens}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" color={'#d3d0d2'} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}

function SplashScreen() {
  return (
    <>
    </>
  );
}

function Navigator({ navigation }) {
  const [isloading, setisloading] = useState(true);
  const [username, setusername] = useState('');

  const AuthContext = React.createContext();

  token = async () => {
    try {
      const getusername = await AsyncStorage.getItem('@username');
      setusername(getusername)
      setisloading(false)
    }
    catch (error) { console.error(error) }
  };
  useEffect(() => {
    token()
  })
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isloading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : username == null ? (
            <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="signup" component={signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen options={{headerShown: false}} name="Tabscreen" component={Tabscreen} />
            </>
          ) : (
            <>
            <Stack.Screen options={{headerShown: false}} name="Tabscreen" component={Tabscreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="signup" component={signup} />
            <Stack.Screen name="Login" component={Login} />
             </>
            )} 
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
