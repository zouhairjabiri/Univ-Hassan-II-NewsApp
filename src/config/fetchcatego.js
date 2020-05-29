import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import moment from "moment";

export function fetchcatego(id, props) {
  const [data, setdata] = useState([]);
  const [myid, setmyid] = useState(id);

  useEffect(() => {
    setmyid(id)
    const url = `https://herokuuniv.herokuapp.com/api/Actualite/${id}/getactualites/`;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept:
          'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token 6819607706a0d0c9702f16fb77750667e8ab684a'
      }
    }).then(res => res.json())
      .then(res => setdata(res))
  }, [id])

  const _actualiteclicked = (actualite) => {
    props.navigation.navigate('feed_detail', { actualite })
  }

  if (data !== []) {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => _actualiteclicked(item)}>
                <ImageBackground
                  style={styles.image}
                  source={{ uri: item.image }}>
                  <View style={styles.imageOverlay} />
                </ImageBackground>
                <View style={styles.textContainer}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.Categorie.Nom}</Text>
                    </View>
                    <View>
                      <Text style={styles.dateCreated}>{moment(item.DatePublication, "YYYY-MM-DD[escaped]hh-mm-ss").fromNow()}
                      </Text>
                      <Text style={styles.title}>{item.Titre}</Text>
                    </View>
                  </View>
                  <View style={styles.starContainer}>
                    <View style={styles.star}>
                      <FontAwesome
                        name='star'
                        color='#FFD700'
                        size={35} />
                      <Text style={styles.starText}>{item.avg_ratings.toFixed(1)}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingTop: 1,
    paddingHorizontal: 1,
  },
  separator: {
    marginTop: 0.5,
    width: '100%',
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlign: 'justify',
    lineHeight: 20,
  },
  dateCreated: {
    color: '#ffffff',
    fontSize: 14,
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
    opacity: 0.5,
    height: '100%'
  },
})
