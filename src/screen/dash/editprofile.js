import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, TextInput,ScrollView } from 'react-native';
import { Button } from 'galio-framework'
import { FontAwesome,MaterialIcons, AntDesign,Entypo,Ionicons,SimpleLineIcons } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'



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
      <TouchableOpacity onPress={() => { props.navigation.navigate('profile') }}>
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
  const [show, setshow] = useState(false);

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


  const handleOpen = () => {
    setshow(true)
  }



  const handleCloseoui = () => {
    AsyncStorage.clear();
    props.navigation.navigate('Home')
    setshow(false)

  }
 
  const handleClosenon = () => {
    setshow(false)
  }
  // const updateaccount = () =>
  // {
  //   if (username.value.length > 0 && firstname.value.length > 0 &&
  //     lastname.value.length > 0) {
  //       const url = `https://herokuuniv.herokuapp.com/api/User/${id}/`
  //       fetch(url, {
  //         method: 'PUT',
  //         headers: {
  //           Accept:
  //             'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           first_name: firstname,
  //           last_name: lastname,
  //           username: username,
  //           email: email,
  //           password: password,
  //         }),
  //       }).then(res => res.json())
  //         .then(res => {
  //           // if(res.username[0] === "A user with that username already exists.")
  //           if(res.id)
  //           {
  //             setusername(res.username)
  //             setfirstname(res.firstname)
  //             setlastname(res.lastname)
  //             handleOpen()
  //           }else
  //           {
  //             setmessage(res.username[0]);
  //           }
           
            
  //         }
  //         )
  //     }else
  //     {
  //       setmessage("Veuillez remplir tous les champs !")
  //     }
    

  // }

  return (
    <View>
        <ScrollView>
         <SCLAlert
          show={show}
          onRequestClose={handleClosenon}
          theme="danger"
          title="Title kbir"
          subtitle="Merci de creer un compte d'abord"
          headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
        >
          <SCLAlertButton theme="info" onPress={handleCloseoui}>Déconnecter</SCLAlertButton>
          <SCLAlertButton theme="default" onPress={handleClosenon}>rester et Continuer</SCLAlertButton>
        </SCLAlert>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.info}>Vos infos</Text>

          <Text>Pseudo</Text>

          <TextInput placeholder="Pseudo"
            style={styles.textInput}
            value={username}
            onChangeText={text => setusername(text)}
            placeholderTextColor={'#d3d0d2'}/>

<Text>Prénom</Text>

          <TextInput placeholder="Prénom "
            style={styles.textInput}
            value={firstname}
            onChangeText={text => setfirstname(text)}
            placeholderTextColor={'#d3d0d2'} />


<Text>Nom</Text>

          <TextInput placeholder="Nom"
            style={styles.textInput}
            value={lastname}
            onChangeText={text => setlastname(text)}
            placeholderTextColor={'#d3d0d2'} />

<Text>Email</Text>

          <TextInput placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={text => setemail(text)}
            placeholderTextColor={'#d3d0d2'} />


          <Text>{message}</Text>
          <Button onPress={() => alert('under construction')} style={{ marginTop: 20 }} round size="small" color="#245591">
            Modifier </Button>
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
  textInput: {
    height: 40,
    width: '75%',
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
    fontSize: 15,
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

