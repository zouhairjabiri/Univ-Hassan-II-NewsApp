import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';

export function profile(props) {

  const [username, setusername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
 
  token = async () => {
    try {
      const getusername = await AsyncStorage.getItem('@username');
      const getfirstname = await AsyncStorage.getItem('@firstname');
      const getlastname = await AsyncStorage.getItem('@lastname');
      const getemail = await AsyncStorage.getItem('@email');
      setusername(getusername)
      setfirstname(getfirstname)
      setlastname(getlastname)
      setemail(getemail)
    }
    catch (error) { console.error(error) }
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
      {username === null ?

        <View style={styles.anonyme}>
          <Text style={styles.anonymetext}>Vous êtes en mode anonyme</Text>
          <AntDesign name="deleteuser" size={80} color="black" />
          <TouchableOpacity style={styles.buttonContainer1} onPress={() => props.navigation.navigate('Home')}>
            <AntDesign size={20} name='login' color='#ffffff' />
            <Text style={styles.but}>   Merci de s'authentifier</Text>
          </TouchableOpacity>
        </View>
        :
        <>
          <Image style={styles.avatar} source={require("../../image/avatar-profile.png")} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{username}</Text>
              <View style={{alignSelf: "center"}}>
              <View style={{ alignSelf: "flex-start", marginTop: 5 }}>
                <Text style={styles.label}>Prénom</Text>
                <Text style={styles.info}>{firstname}</Text>
              </View>
              <View style={{ alignSelf: "flex-start", marginTop: 5 }}>
                <Text style={styles.label}>Nom</Text>
                <Text style={styles.info}>{lastname}</Text>
              </View>
              <View style={{ alignSelf: "flex-start", marginTop: 5 }}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.info}>{email}</Text>
              </View>
              </View>
              <View style={{ marginTop: 50 }} />
              <TouchableOpacity style={styles.buttonContainer1} onPress={() => props.navigation.navigate('editprofile')}>
                <FontAwesome size={20} name='edit' color='#ffffff' />
                <Text style={styles.but}>         Edit Info</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()} style={styles.buttonContainer1}>
                <FontAwesome size={20} name='sign-out' color='#ffffff' />
                <Text style={styles.but}>         Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#245591",
    height: 200,
  },
  anonyme: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  anonymetext: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 30
  },
  buttonContainer1: {
    width: 250,
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#245591",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#245591',
  },
  info: {
    fontSize: 19,
    color: "#245591",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#ecf0f1",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30,
  },
  name: {
    marginTop: 5,
    marginBottom: 30,
    fontSize: 30,
    color: "#696969",
    fontWeight: "bold"
  },
  but: {
    fontWeight: "bold",
    color: '#ffffff'
  }
});