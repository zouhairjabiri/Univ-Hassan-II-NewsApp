import React, { useState, useEffect} from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import moment from "moment";
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';


export function filterbynumberrate (props){

    const [data, setdata] = useState([]);
    const [isFetching, setisFetching] = useState(false);
    const [begin, setbegin] = useState(true);

    props.navigation.setOptions({
        headerTitle: () => <Text style={styles.Title}>Le plus noté</Text>,
        headerStyle: {
            backgroundColor: '#245591',
        },
        headerLeft: () =>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                <AntDesign name="back" size={30} style={styles.icons} />
            </TouchableOpacity>,
    })
    useEffect(() => {
        fetch('https://herokuuniv.herokuapp.com/api/Actualite/getactualitesbynumberrate/', {
          method: 'GET',
          headers: {
            Accept:
              'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token 6819607706a0d0c9702f16fb77750667e8ab684a`
          }
        }).then(res => res.json())
          .then(res => {
            setbegin(false)
            setdata(res)
            setisFetching(false)
          })
          .catch(error => console.log(error))
      }, []);
    
    return (
        <View>
        {begin ? <ActivityIndicator animating size="large" /> : null}
        <View style={styles.container}>
          <FlatList style={styles.list}
            data={data}
            onRefresh={() => onRefresh()}
            refreshing={isFetching}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              const _actualiteclicked = (actualite) => {
                props.navigation.navigate('feed_detail', { actualite })
              }
              return (
                <View style={styles.container}>
                  <TouchableOpacity onPress={() => _actualiteclicked(item)}>
                    <ImageBackground
                      style={styles.image}
                      source={{ uri: item.image }} >
                      <View style={styles.imageOverlay} />
                    </ImageBackground>
  
                    <View style={styles.textContainer}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.Categorie.Nom}</Text>
                      </View>
                      <View>
                        <Text style={styles.dateCreated}>{moment(item.DatePublication, "YYYY-MM-DD[escaped]hh-mm-ss").fromNow()}
                        </Text>
                        <Text style={styles.dateCreated}>Nombre de Note : {item.no_of_ratings}</Text>

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
              )
            }}
          />
        </View>
      </View>
    )
}

export default filterbynumberrate;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingTop: 1,
        paddingHorizontal: 1,
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
      searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 320,
    
      },
      iconclose: {
        color: '#d3d0d2',
        marginLeft: 13,
        marginRight: 13,
    
      },
      icons: {
        color: '#d3d0d2',
        marginLeft: 13,
        marginRight: 13,
    
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
      textInput: {
        height: 40,
        width: '95%',
        borderBottomColor: '#d3d0d2',
        borderBottomWidth: 1,
        marginBottom: 25,
        fontSize: 15,
        color: '#ffffff',
        marginTop: 17,
        marginLeft: 20
      },
})
