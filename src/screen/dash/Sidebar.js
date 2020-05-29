import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export function Sidebar(props) {

  const [Categorie, setCategorie] = useState([]);
  useEffect(() => {
    fetch('https://herokuuniv.herokuapp.com/api/Categorie/', {
      method: 'GET',
      headers: {
        Accept:
          'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token 6819607706a0d0c9702f16fb77750667e8ab684a'
      }
    }).then(res => res.json())
      .then(res => {
        setCategorie(res)
      }
      )
      .catch(error => console.log(error))
  }, []);


  const categorieclicked = (Categorie_id,Categorie_nom) => {
    props.navigation.navigate('Categorie', { 'Categorie_id': Categorie_id, 'Categorie_nom':Categorie_nom })
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <Text style={styles.act}>Tous les actualités  </Text>}
        onPress={() => props.navigation.navigate('feed_home')}
        icon={() => <FontAwesome size={25} color="#245591" name='newspaper-o' />}
        focused="true"
      />
      {Categorie.map((item) =>
        <View key={item.id}>
          <DrawerItem
            label={() => <View><Text style={styles.catnames}>{item.Nom}</Text></View>}
            onPress={() => categorieclicked(item.id,item.Nom)}
            icon={() => <View style={styles.drawer}>
              <MaterialIcons size={25} name={item.icon} style={styles.icons} />
            </View>}
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

export default Sidebar;
const styles = StyleSheet.create({
  act: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlign: 'center',
  },
  catnames: {
    fontSize: 15,
    textAlign: 'left',
    textAlign: 'center',
  },
  icons: {
    color: "#245591",
  },
  drawer: {
    marginLeft: 30,
  }
})