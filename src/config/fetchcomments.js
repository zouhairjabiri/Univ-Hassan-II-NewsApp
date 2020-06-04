import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import { Divider } from 'react-native-elements';
import moment from "moment";


export function fetchcomments(id, props) {
  const [data, setdata] = useState([]);
  const [begin, setbegin] = useState(true);
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
      })

      setbegin(false)

  }, [id])


  return (
    <View style={styles.container}>
      {begin ? <ActivityIndicator animating size="large" /> : null}

      {data.length > 0 ?
        <FlatList
          data={data}
          ItemSeparatorComponent={() =>
            <Divider style={{ backgroundColor: 'blue' }} />
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.badgeText}>{item.Commentaire}</Text>
              <Text style={styles.badgeText}>{item.User.username}</Text>
              <Text style={styles.dateCreated}>{moment(item.Date, "YYYY-MM-DD[escaped]hh-mm-ss").fromNow()}
                      </Text>
            </View>
          }
        />
        :
        <>
         <Text>no comments</Text>
         <Image
        style={styles.logo}
        source={require('../image/nocomments.png')}
      />
      </> 
      }
     
    </View>
  )


}

const styles = StyleSheet.create({
   logo: {
    marginTop:50,
    width: '80%',
    height: '60%',
  },

  container: {
    textAlign:'center',
    alignItems:'center',
  },
})
