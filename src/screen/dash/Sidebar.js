import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';


export function Sidebar(props) {

  const [Categorie, setCategorie] = useState([]);
  const [dropdown, setdropdown] = useState(false);

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


  const categorieclicked = (Categorie_id, Categorie_nom) => {
    props.navigation.navigate('Categorie', { 'Categorie_id': Categorie_id, 'Categorie_nom': Categorie_nom })
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <Text style={styles.act}>Toutes les actualités</Text>}
        onPress={() => props.navigation.navigate('feed_home')}
        icon={() => <MaterialIcons style={{ marginLeft: 5 }} name="assignment" size={25} color="#245591" />}
        focused="true"
      />
      <DrawerItem
        label={() => <Text style={styles.act}>Les mieux notées</Text>}
        onPress={() => props.navigation.navigate('filterbyratenumber')}
        icon={() => <MaterialIcons style={{ marginLeft: 5 }} name="stars" size={25} color="#245591" />}
        focused="true"
      />
      <DrawerItem
        label={() => <Text style={styles.act}>Les plus notées</Text>}
        onPress={() => props.navigation.navigate('filterbynumberrate')}
        icon={() => <MaterialIcons style={{ marginLeft: 5 }} name="trending-up" size={25} color="#245591" />}

        focused="true"
      />

      <DrawerItem
        label={() => <Text style={styles.act}>Les plus commentées</Text>}
        onPress={() => props.navigation.navigate('filterbycomments')}
        icon={() => <MaterialIcons style={{ marginLeft: 5 }} name="chat" size={25} color="#245591" />}

        focused="true"
      />

      <DrawerItem
        label={() => <Text style={styles.act}>Triées par date</Text>}
        icon={() => <MaterialIcons style={{ marginLeft: 5 }} name="update" size={25} color="#245591" />}
        focused="true"
      />

      <DrawerItem
        label={
          () =>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => { setdropdown(!dropdown) }}>
              <Text style={styles.act}>Triées par catégorie</Text>
              {dropdown ?
                <AntDesign name="caretdown" size={24} color="blue" />
                : <AntDesign name="caretup" size={24} color="blue" />
              }
            </TouchableOpacity></View>
        }
        icon={() =>
          <TouchableOpacity onPress={() => { setdropdown(!dropdown) }}>
            <MaterialIcons style={{ marginLeft: 5 }} name="filter-list" size={25} color="#245591" />
          </TouchableOpacity>
        }
        focused="true"
      />
      {dropdown ?
null        :
        <>
          {Categorie.map((item) =>
            <View key={item.id}>
              <DrawerItem
                label={() => <View><Text style={styles.catnames}>{item.Nom}</Text></View>}
                onPress={() => categorieclicked(item.id, item.Nom)}
                icon={() => <View style={styles.drawer}>
                  <MaterialIcons size={25} name={item.icon} style={styles.icons} />
                </View>}
              />
            </View>
          )}
        </>


      }


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