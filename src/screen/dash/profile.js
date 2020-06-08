import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export function profile(props) {

  const [username, setusername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  token = async () => {
    try {
      const getusername = await AsyncStorage.getItem('@username');
      const getfirstname = await AsyncStorage.getItem('@firstname');
      const getlastname = await AsyncStorage.getItem('@lastname');
      setusername(getusername)
      setfirstname(getfirstname)
      setlastname(getlastname)
    } 
    catch (error) {console.error(error)}
  };

  useEffect(() => {
    token()
   }, [])

  const logout = () => {
    AsyncStorage.clear();
    props.navigation.navigate('Home')
  }
  return (
    <View>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.info}> {firstname} - {lastname}</Text>
          <TouchableOpacity style={styles.buttonContainer1} onPress={()=> props.navigation.navigate('editprofile')}>
            <FontAwesome size={20} name='edit' color='#ffffff' />
            <Text style={styles.but}>Edit Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()} style={styles.buttonContainer2}>
            <SimpleLineIcons size={20} name='logout' color='#ffffff' />
            <Text style={styles.but}>   Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#245591",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold"
  },
  info: {
    fontSize: 20,
    color: "#245591",
    marginTop: 10
  },
  buttonContainer1: {
    marginTop: 100,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#245591",
  },
  buttonContainer2: {
    marginTop: 8,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#245591",
  },
  but: {
    color: '#ffffff'
  }
});

