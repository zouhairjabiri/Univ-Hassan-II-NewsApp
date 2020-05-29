import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator, AsyncStorage, Image, TextInput } from 'react-native'
import { Text, Button } from 'galio-framework'
import Loader from '../../config/Loader'
import PasswordTextBox from './PasswordTextBox'

const Login = ({ navigation }) => {
  const [username, setusername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [error, seterror] = useState('');
  const [loadingstate, setloadingstate] = useState(false);

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
      fetch('https://herokuuniv.herokuapp.com/auth/', {
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
            setloadingstate(false)
            navigation.navigate('Tabscreen', {
              screen: 'Drawerscreen'})

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

  return (

    <View style={styles.container}>
      <Text style={styles.para2}>Université Hassan ll de Casablanca</Text>
      <Image
        style={styles.logo}
        source={require('../../image/Logo-UHllC-White.png')}
      />
      <Loader loading={loadingstate} />

      <TextInput placeholder="Nom d'utilisateur"
        style={styles.textInput}
        value={username.value}
        onChangeText={text => setusername({ value: text, error: '' })}
        placeholderTextColor={'#d3d0d2'} />

      <PasswordTextBox
        icon="lock"
        value={password.value}
        onChange={text => setPassword({ value: text, error: '' })} />

      <Text style={styles.error}>{error}</Text>

      <Button onPress={_onLoginPressed} style={{ marginTop: 10 }} round size="small" color="#648cb4">
        Login </Button>

      <Text style={{ marginTop: 110, color: '#ffffff' }}> Vous n'avez pas de compte ? </Text>

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
  logo: {
    width: '40%',
    height: '12%',
    marginTop: 10,
    marginBottom: 60,
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
  }
}
);