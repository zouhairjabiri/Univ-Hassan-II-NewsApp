import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import APIURL from '../../config/api'
import TOKEN from '../../config/token'

export function Sidebar(props) {

  const [Categorie, setCategorie] = useState([]);
  const [dropdown, setdropdown] = useState(false);
  const [dropdown1, setdropdown1] = useState(false);

  useEffect(() => {
    fetch(`${APIURL}api/Categorie/`, {
 
    method: 'GET',
      headers: {
        Accept:
          'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`  
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
      <TouchableOpacity onPress={() => { setdropdown1(!dropdown1) }}>

        <DrawerItem
          label={
            () =>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.act}>Trier par date</Text>
                {dropdown1 ?
                  <AntDesign name="caretup" size={15} color="#245591" style={{ marginLeft: 70 }} />
                  :
                  <AntDesign name="caretdown" size={15} color="#245591" style={{ marginLeft: 70 }} />
                }

              </View>
          }
          icon={() =>
            <MaterialIcons name="date-range" style={{ marginLeft: 5 }} size={25} color="#245591" />
          }
          focused="true"
        />
      </TouchableOpacity>

      {dropdown1 ?
        <>
          <View>
            <DrawerItem
              label={() => <View><Text style={styles.catnames}>Les dernières 24h</Text></View>}
              onPress={() => props.navigation.navigate('filterday')}
              icon={() => <View style={styles.drawer}>
                <MaterialIcons name="update" size={25} style={styles.icons} />
              </View>}
            />
            <DrawerItem
              label={() => <View><Text style={styles.catnames}>Cette semaine</Text></View>}
              onPress={() => props.navigation.navigate('filtersemaine')}
              icon={() => <View style={styles.drawer}>
                <MaterialCommunityIcons name="calendar-week" size={25} style={styles.icons} />
              </View>}
            />
            <DrawerItem
              label={() => <View><Text style={styles.catnames}>Ce mois</Text></View>}
              onPress={() => props.navigation.navigate('filtermonth')}
              icon={() => <View style={styles.drawer}>
                <MaterialCommunityIcons name="calendar-month" size={25} style={styles.icons} />
              </View>}
            />
          </View>

        </>
        :
        null
      }


      <TouchableOpacity onPress={() => { setdropdown(!dropdown) }}>

        <DrawerItem
          label={
            () =>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.act}>Trier par catégorie</Text>

                {dropdown ?

                  <AntDesign name="caretup" size={15} color="#245591" style={{ marginLeft: 35 }} />

                  :
                  <AntDesign name="caretdown" size={15} color="#245591" style={{ marginLeft: 35 }} />
                }

              </View>
          }
          icon={() =>
            <MaterialIcons style={{ marginLeft: 5 }} name="filter-list" size={25} color="#245591" />
          }
          focused="true"
        />
      </TouchableOpacity>

      {dropdown ?

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
        :
        null
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