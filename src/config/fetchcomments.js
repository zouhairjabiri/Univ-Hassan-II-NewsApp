import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import { Divider } from 'react-native-elements';
import moment from "moment";


export function fetchcomments(id, props) {
  const [data, setdata] = useState([]);
  const [begin, setbegin] = useState(true);
  const [isFetching, setisFetching] = useState(false);


  useEffect(() => {
    const url = `https://herokuuniv.herokuapp.com/api/Comment/${id}/getComments/`;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept:
          'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token 6819607706a0d0c9702f16fb77750667e8ab684a'
      }
    }).then(res => res.json())
      .then(res => {
        setdata(res)
        setisFetching(false)
  
      })

    setbegin(false)

  }, [id, isFetching])



  useEffect(() => {
    const url = `https://herokuuniv.herokuapp.com/api/Comment/${id}/getComments/`;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept:
          'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token 6819607706a0d0c9702f16fb77750667e8ab684a'
      }
    }).then(res => res.json())
      .then(res => {
        setdata(res)
        setisFetching(false)
  
      })

    setbegin(false)

  }, [id, isFetching])

  const onRefresh = () => {
    setisFetching(true)
  }

  return (
    <View style={styles.container}>
      {begin ? <ActivityIndicator animating size="large" /> : null}
      {data.length < 1 ?
                <Text>Soyez le premier à commenter !!</Text>
        : null        
        }
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
         {data.length < 1 ?
              <>
                <Image
                  style={styles.emptylogo}
                  source={require('../image/nocomments.png')}
                />
              </>
              : null
            }

    </View>
  )
}

const styles = StyleSheet.create({
  emptylogo: {
    // marginTop: 50,
    width: '100%',
    height: '60%',
  },
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 1,
    paddingHorizontal: 1,
  },
  textContainer: {
    backgroundColor: "#dce8f7",
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
