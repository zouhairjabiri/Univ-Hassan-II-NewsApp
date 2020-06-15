import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { FontAwesome, MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

import moment from "moment";

export function feed_detail(props) {
  const { actualite } = props.route.params;
  const { rateuser } = props.route.params;
  const [username, setusername] = useState('');
  const [id, setid] = useState('');
  const [message, setmessage] = useState('');
  const [show, setshow] = useState(false);

  props.navigation.setOptions({
    headerTitle: '',
    headerStyle: {
      backgroundColor: '#245591',
    },

    headerRight: () =>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <Entypo name="share" size={30} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { _Commentsactualite() }}>
          <MaterialIcons name="comment" size={30} style={styles.icons} />
        </TouchableOpacity>
      </View>,
    headerLeft: () =>
      <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
        <AntDesign name="back" size={30} style={styles.icons} />
      </TouchableOpacity>,
  })

  const _Commentsactualite = () => {
    const actualite_id = actualite.id
    props.navigation.navigate('feed_comments', {
      actualite_id: actualite_id,
      user_id: id,
    }
    )
  }
  token = async () => {
    try {
      const getusername = await AsyncStorage.getItem('@username');
      let getid = await AsyncStorage.getItem('@id');
      const getoken = await AsyncStorage.getItem('@token');
      setusername(getusername)
      setid(getid)
    }
    catch (error) { console.error(error) }
  };

  useEffect(() => {
    token()
  }, [props.route.params.myid])

  const handleOpen = () => {
    setshow(true)
  }



  const handleCloseoui = () => {
    props.navigation.navigate('Home')
    setshow(false)

  }

  const handleClosenon = () => {
    setshow(false)
  }


  const onFinishRating = (number) => {
    if (id == null) {
      handleOpen()
    } else {
      const url = `https://herokuuniv.herokuapp.com/api/Rating/${actualite.id}/rating/`
      fetch(url, {
        method: 'POST',
        headers: {
          Accept:
            'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token 6819607706a0d0c9702f16fb77750667e8ab684a'
        },
        body: JSON.stringify({
          id: id,
          rate: number,
        }),
      }).then(res => res.json())
        .then(res => {
          if (res.message === 'Succed') {
            alert(username + ':  Merci pour votre évaluation ')
          } else {
            alert(username + ':  la modification est enregistrer')
          }
        }

        )
    }

  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <ImageBackground
            style={styles.image}
            source={{ uri: actualite.image }} >
            <View style={styles.imageOverlay} />
          </ImageBackground>
          <View style={styles.textContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{actualite.Categorie.Nom}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.starContainer}>
        <View style={styles.star}>
          <FontAwesome
            name='star'
            color='#FFD700'
            size={35} />
          <Text style={styles.starText}>{actualite.avg_ratings.toFixed(1)}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>{actualite.Titre}</Text>
        <Text style={styles.dateCreated}>{moment(actualite.DatePublication).format("YYYY/MM/DD hh:mm")}
        </Text>
        <Text style={styles.editeur}>Éditeur : {actualite.auteur.first_name}</Text>
      </View>

      {username === null ? null :
        <View>
          <AirbnbRating
            count={5}
            reviews={["Nul", "Mauvais", "Pas mal", "Bien", "Excellent"]}
            defaultRating={5}
            size={15}
            onFinishRating={onFinishRating}
            defaultRating={rateuser === null ? 0 : rateuser}
          />
          <Text style={styles.vote}>Total des votes : {actualite.no_of_ratings}</Text>
        </View>
      }

      <Text style={styles.desc}> {actualite.Description} </Text>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  desc: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 15,
    textAlign: 'left',
    textAlign: 'justify',
    color: '#000000',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 15,
    marginRight: 15,
  },
  icons: {
    color: '#d3d0d2',
    marginLeft: 13,
    marginRight: 13,

  },
  container: {
    position: 'relative',
    backgroundColor: '#F8F8FF',
    paddingTop: 1,
    paddingHorizontal: 1,
  },
  textContainer: {
    position: 'absolute',
    top: 10,
    bottom: 20,
    left: 15,
    right: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  starContainer: {
    position: 'absolute',
    top: 8,
    bottom: 20,
    left: 15,
    right: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  starText: {
    position: 'absolute',
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlign: 'justify',
    lineHeight: 25,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  dateCreated: {
    color: '#000000',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  vote: {
    color: '#000000',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  },
  editeur: {
    color: '#8B0000',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  badge: {
    backgroundColor: '#245591',
    opacity: 0.9,
    borderRadius: 5,
    height: 30,
    padding: 5,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    height: 250,
  },
  imageOverlay: {
    backgroundColor: '#000000',
    opacity: 0.4,
    height: '100%'
  },
})
