import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator, AsyncStorage, Image, TextInput } from 'react-native'
import { Text, Button } from 'galio-framework'
import Loader from '../../config/Loader'
import { Item, Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import APIURL from '../../config/api'

const Login = ({ navigation }) => {
  const [username, setusername] = useState({ value: 'test97', error: '' });
  const [password, setPassword] = useState({ value: 'test', error: '' });
  const [error, seterror] = useState('');
  const [loadingstate, setloadingstate] = useState(false);
  const [icon, seticon] = useState("eye");
  const [PasswordTextBox, setPasswordTextBox] = useState(true);

  async function token(key, value) {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  const _onLoginPressed = ({ }) => {
    if (username.value.length > 0 && password.value.length > 0) {
      <ActivityIndicator size="large" color="#ffffff" />
      setloadingstate(true)
      fetch(`${APIURL}auth/`, {
        method: 'POST',
        headers: {
          Accept:
            'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }).then(res => res.json())
        .then(res => {
          if (res.token) {
            token('@token', res.token)
            token('@id', res.id)
            token('@firstname', res.First_name)
            token('@lastname', res.Last_name)
            token('@username', res.username)
            token('@email', res.email)

            setloadingstate(false)
             
            navigation.push(
              'Tabscreen', {
              screen: 'Stackscreen',
              params: {
                screen : 'Drawerscreen',
              }
            })
          } else {
            setusername({ value: '' })
            setPassword({ value: '' })
            setloadingstate(false)
            seterror("Le nom d'utilisateur ou le mot de passe est incorrect !")
          }
        }
        ).catch(error => console.log(error))
    } else {
      setusername({ value: '' })
      setPassword({ value: '' })
      seterror("Veuillez remplir tous les champs !")
    }
  };



  const _changeIcon = () => {
    if (icon == 'eye-slash') {
      seticon('eye')
    }

    setPasswordTextBox(!PasswordTextBox)
  }

  return (

    <View style={styles.container}>
      <Text style={styles.para2}>Université Hassan ll de Casablanca</Text>
      <Image
        style={styles.logo}
        source={require('../../image/Logo-UHllC-White.png')}
      />

      <TextInput placeholder="Pseudo"
        style={styles.textInput}
        value={username.value}
        onChangeText={text => setusername({ value: text, error: '' })}
        placeholderTextColor={'#d3d0d2'} />
      <Item style={styles.textInput1}>
        <FontAwesome active name="lock" color='#ffffff' size={18} />
        <Input
          style={{ fontSize: 15, color: '#fff', paddingLeft: 10, height: 40 }}
          placeholder='Mot de passe'
          placeholderTextColor={'#d3d0d2'}
          value={password.value}
          secureTextEntry={PasswordTextBox}
          onChangeText={text => setPassword({ value: text, error: '' })} />
        <FontAwesome name={icon} color='#ffffff' size={18} onPress={_changeIcon} />
      </Item>



      <Text style={styles.error}>{error}</Text>

      <Button onPress={_onLoginPressed} style={{ marginTop: 10 }} round size="small" color="#648cb4">
        Login </Button>

      <Loader loading={loadingstate} />

      <Text style={{ marginTop: 150, color: '#ffffff' }}> Vous n'avez pas de compte ? </Text>

      <Button
        onPress={() => navigation.navigate('signup', { signup: 'gi' })}
        style={{ marginTop: 10 }} round size="small" color="#648cb4">S'incrire</Button>

    </View>
  );
}

export default Login

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: '#245591',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput1: {
    width: '75%',
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  logo: {
    width: '40%',
    height: '12%',
    marginTop: 10,
    marginBottom: 80,
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
  PassTextInput: {
    height: 40,
    width: '75%',
    fontSize: 18,
    borderBottomColor: '#d3d0d2',
    borderBottomWidth: 1,
    marginBottom: 25,
    fontSize: 15,
    color: '#ffffff'
  },
  error: {
    fontSize: 16,
    marginTop: 20,
    color: '#d3d0d2',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  para2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40
  }
}
);