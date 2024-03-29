import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, TextInput, ScrollView } from 'react-native';
import { Button } from 'galio-framework'
import { FontAwesome,  AntDesign } from '@expo/vector-icons';
import APIURL from '../../config/api'
import TOKEN from '../../config/token'

const editprofile = (props) => {

  props.navigation.setOptions({
    headerTitle: () => <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={styles.Title}>Modifier votre profil</Text>
      <FontAwesome name="edit" style={{ marginLeft: 5 }} size={30} color="#d3d0d2" />
    </View>,
    headerStyle: {
      backgroundColor: '#245591',
    },
    headerLeft: () =>
      <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
        <AntDesign name="back" size={30} style={styles.icons} />
      </TouchableOpacity>,
  })


  const [username, setusername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [id, setid] = useState('');
  const [message, setmessage] = useState('');

  async function settoken(key, value) {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  };

   


  token = async () => {
    try {
      const getusername = await AsyncStorage.getItem('@username');
      const getfirstname = await AsyncStorage.getItem('@firstname');
      const getlastname = await AsyncStorage.getItem('@lastname');
      const getid = await AsyncStorage.getItem('@id');
      const getemail = await AsyncStorage.getItem('@email');
      const getpassword = await AsyncStorage.getItem('@password');
      setusername(getusername)
      setfirstname(getfirstname)
      setlastname(getlastname)
      setemail(getemail)
      setpassword(getpassword)
      setid(getid)
    }
    catch (error) { console.error(error) }
  };

  useEffect(() => {
    token()
  }, [])



  const updateaccountbasic = () =>
  {
    if (firstname.length > 0 && email.length > 0 &&
      lastname.length > 0) {
        fetch(`${APIURL}api/User/${id}/update_account_basic/`, {
          
          method: 'POST',
          headers: {
            Accept:
              'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            email: email,
          }),
        }).then(res => res.json())
          .then(res => {   
            if(res.message === true)
            {
              setfirstname(res.First_name)
              setlastname(res.Last_name)
              setemail(res.email)
              AsyncStorage.clear();
              props.navigation.replace('Home')

            }else
            {
              token()
              setmessage(res.message);
            }
          }
          )
      }else
      {
        setmessage("Veuillez remplir tous les champs !")
      }

  }

  const updateaccountusername = () =>
  {
    if (username.length > 0 ) {
        fetch(`${APIURL}api/User/${id}/update_account_username/`, {
          method: 'POST',
          headers: {
            Accept:
            'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
          }),
        }).then(res => res.json())
          .then(res => {   
            console.log(res.message);
                     
            if(res.message === true)
            {
              setusername(res.username)
              AsyncStorage.clear();
              props.navigation.replace('Home')

             }else
            {
              setmessage(res.message);
              token()
            }
          }
          )
      }else
      {
        setmessage("Veuillez remplir tous les champs !")
      }

  }

  return (
    <View>
      <ScrollView>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={require("../../image/avatar-profile.png")} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.label}>Pseudo</Text>
              <TextInput placeholder="Pseudo"
                style={styles.textInput}
                value={username}
                onChangeText={text => setusername(text)}
                placeholderTextColor={'#d3d0d2'} />
            </View>
            <Button onPress={() => updateaccountusername()} style={{ marginTop: 20 }} round size="small" color="#245591">
              Changer Pseudo </Button>

            <View style={{marginTop: 25}} />
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput placeholder="Prénom "
                style={styles.textInput}
                value={firstname}
                onChangeText={text => setfirstname(text)}
                placeholderTextColor={'#d3d0d2'} />
            </View>

            <View style={{ alignSelf: "center" }}>
              <Text style={styles.label}>Nom</Text>
              <TextInput placeholder="Nom"
                style={styles.textInput}
                value={lastname}
                onChangeText={text => setlastname(text)}
                placeholderTextColor={'#d3d0d2'} />
            </View>

            <View style={{ alignSelf: "center" }}>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholder="Email"
                style={styles.textInput}
                value={email}
                onChangeText={text => setemail(text)}
                placeholderTextColor={'#d3d0d2'} />
            </View>

            <Text>{message}</Text>
            <Button onPress={() => updateaccountbasic()} style={{ marginTop: 10 }} round size="small" color="#245591">
              Modifier Infos</Button>
          </View>



        </View>
      </ScrollView>
    </View>


  )
}

export default editprofile

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#245591",
    height: 200,
  },
  label: {
    fontWeight: "bold",
    color: '#245591',
  },
  textInput: {
    fontSize: 15,
    height: 40,
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d0d2',
    marginBottom: 10,
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
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#ecf0f1",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
    marginBottom: 10,
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
    fontWeight: "bold",
    color: "#245591",
    marginTop: 10,
    marginBottom: 20,
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

