import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { Text, Button } from 'galio-framework';


export function HomeScreen(props) {


  return (
    <View style={styles.container}>
      <Text style={styles.para}>Bienvenue sur notre application !</Text>
      <Text style={styles.para2}>Université Hassan ll de Casablanca</Text>

      <Image
        style={styles.logo}
        source={require('../../image/Logo-UHllC-White.png')}
      />

      <Button style={{ marginTop: 50 }} round size="small" color="#648cb4"
        onPress={() => props.navigation.navigate('Login')}>
        Login</Button>

      <Button style={{ marginTop: 10 }} round size="small" color="#648cb4"
        onPress={() => props.navigation.navigate('signup')}>
        S'incrire</Button>
    </View>
  );
}


export default HomeScreen;

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: '#245591',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: '50%',
    height: '15%',
    marginTop: 10,
    marginBottom: 40,
  },
  para: {
    fontSize: 22,
    color: '#ffffff',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 80,
  },
  para2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  }
}
);