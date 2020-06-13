import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { fetchcomments } from '../../config/fetchcomments';
import { FontAwesome,MaterialIcons, AntDesign,Entypo,Ionicons } from '@expo/vector-icons';

import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'

  

export function feed_comments(props) {

    const [actualite_id, setactualite_id] = useState(props.route.params.actualite_id)
    const [user_id, setuser_id] = useState(props.route.params.user_id)
    const [refreshing, setrefreshing] = useState(false)
    const [show, setshow] = useState(false);


    props.navigation.setOptions({
        headerTitle: () => <Text style={styles.Title}>Commentaires</Text>,
        headerStyle: {
            backgroundColor: '#245591',
        },
        headerLeft: () =>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                <AntDesign name="back" size={30} style={styles.icons} />
            </TouchableOpacity>,
        headerRight: () =>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => {checkuser()}}>
            <AntDesign name="plus" size={30} style={styles.icons} />
            <SCLAlert
            show={show}
            onRequestClose={handleClosenon}
            theme="info"
            title="Title kbir"
            subtitle="Merci de creer un compte d'abord"
            headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
          >
            <SCLAlertButton theme="info" onPress={handleCloseoui}>Oui</SCLAlertButton>
            <SCLAlertButton theme="default" onPress={handleClosenon}>non , Continuer</SCLAlertButton>
          </SCLAlert>
            </TouchableOpacity>
  
          </View>,
    })

 const handleCloseoui = () => {
    props.navigation.navigate('Home')
    setshow(false)

  }
 
  const handleClosenon = () => {
    setshow(false)
  }

  const handleOpen = () => {
    setshow(true)
  }

const checkuser = () =>
{
    if(user_id == null)
    {
      handleOpen()
    }else
    {
        props.navigation.navigate('feed_addcomments', {actualite_id})  

    }
}

return(
       

            fetchcomments(props.route.params.actualite_id, props)


)
    
    
}


const styles = StyleSheet.create({
    icons: {
        color: '#d3d0d2',
        marginLeft: 13,
        marginRight: 13,

    },
    Title: {
        color: "#d3d0d2",
        fontSize: 20,

    }
})
