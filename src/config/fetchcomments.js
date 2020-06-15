import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import moment from "moment";

import APIURL from '../config/api'

export function fetchcomments(id, props) {
  const [data, setdata] = useState([]);
  const [isFetching, setisFetching] = useState(false);
  const [isloading, setisloading] = useState(true);


  useEffect(() => {
    fetch(`${APIURL}api/Comment/${id}/getComments/`, {
      method: 'GET',
      headers: {
        Accept:
          'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`  
      }
    }).then(res => res.json())
      .then(res => {
        setdata(res)
         setisFetching(false)
         setisloading(false)
      }).catch(error => console.log(error))
  }, [id, isFetching])

  const onRefresh = () => {
    setisFetching(true)
  }

  return (
    <View style={styles.container}>
      {isloading ? (
    <ActivityIndicator animating size="large" /> 
) : data.length < 1 ? (
    <>
    <View style={styles.nocom}>
      <Image
        style={styles.emptylogo}
        source={require('../image/no-data-found2.png')}
      />
      <Text style={styles.nocomments}>Soyez le premier à commenter !!</Text>
      <Text style={styles.nocomments}>Cliquez sur le bouton "+"</Text>
    </View>
  </>
) : 
(
<> 
<FlatList
    data={data}
    onRefresh={() => onRefresh()}
    refreshing={isFetching}
    ItemSeparatorComponent={() => {
      return (
        <View style={styles.separator} />
      )
    }}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) =>
      <View style={styles.textContainer}>
        <Text style={styles.user}>{item.User.username}</Text>
        <Text style={styles.comment}>{item.Commentaire}</Text>
        <Text style={styles.dateCreated}>{moment(item.Date, "YYYY-MM-DD[escaped]hh-mm-ss").fromNow()}</Text>
      </View>
    }
  />
</>
)} 
    </View>
  )
}

const styles = StyleSheet.create({
  emptylogo: {
    width: 200,
    height: 200,
    opacity: 0.3,
    alignSelf: "center",
    marginBottom: 30
  },
  nocom: {
    marginTop: 100
  },
  nocomments: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#696969",
    textAlign: "center",
  },
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 1,
    paddingHorizontal: 1,
  },
  textContainer: {
    backgroundColor: "#DFEFFF",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 0.5,
    borderRadius: 12,
  },
  user: {
    marginLeft: 10,
    marginRight: 10,
    color: '#133966',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  comment: {
    marginLeft: 10,
    marginRight: 10,
    color: '#000000',
    fontSize: 14,
    textAlign: "justify",
  },
  dateCreated: {
    marginLeft: 10,
    marginRight: 10,
    color: '#000000',
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 5,
  },
})
