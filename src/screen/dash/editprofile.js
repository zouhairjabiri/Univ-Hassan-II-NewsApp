import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { FontAwesome, AntDesign, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Button } from 'galio-framework'

const editprofile = (props) => {

  props.navigation.setOptions({
    headerTitle: () => <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={styles.Title}>Modifier Mon Profile</Text>
      <FontAwesome name="edit" style={{ marginLeft: 5 }} size={30} color="#d3d0d2" />
    </View>,
    headerStyle: {
      backgroundColor: '#245591',
    },
    headerLeft: () =>
      <TouchableOpacity onPress={() => { props.navigation.navigate('profile') }}>
        <AntDesign name="back" size={30} style={styles.icons} />
      </TouchableOpacity>,
  })


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
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.info}>Mes informations</Text>


          <TextInput placeholder="Nom d'utilisateur"
            style={styles.textInput}
            value={username}
            onChangeText={text => setusername(text)}
            placeholderTextColor={'#d3d0d2'} />


<TextInput placeholder="Prenom "
            style={styles.textInput}
            value={firstname}
            onChangeText={text => setfirstname(text)}
            placeholderTextColor={'#d3d0d2'} />



<TextInput placeholder="Nom"
            style={styles.textInput}
            value={lastname}
            onChangeText={text => setlastname(text)}
            placeholderTextColor={'#d3d0d2'} />

<Button onPress={()=> alert('sir t9awad tal mn ba3d')} style={{ marginTop: 10 }} round size="small" color="#648cb4">
        modifier </Button>
          </View>

          
  
      </View>
    </View>


  )
}

export default editprofile

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#245591",
    height: 200,
  },
  textInput: {
    height: 40,
    width: '75%',
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
    fontSize: 15,
    color: '#ffffff'
  },
  icons: {
    color: '#d3d0d2',
    marginLeft: 13,
    marginRight: 13,

  },
  Title: {

    color: "#d3d0d2",
    fontSize: 20,

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

