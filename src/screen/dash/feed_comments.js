import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign , FontAwesome} from '@expo/vector-icons';
import { fetchcomments } from '../../config/fetchcomments';
export function feed_comments(props) {

    const [actualite_id, setactualite_id] = useState(props.route.params.actualite_id)
    const [refreshing, setrefreshing] = useState(false)
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
            <TouchableOpacity onPress={() => { props.navigation.navigate('feed_addcomments', {actualite_id}) }}>
                <AntDesign name="plus" size={30} style={styles.icons} />
            </TouchableOpacity>
              <TouchableOpacity onPress={()=> alert('mazal ghanzidha')}>
              <FontAwesome name="refresh" size={30} style={styles.icons} />  
            </TouchableOpacity>
          </View>,
    })
// useEffect(() => {
//         fetchcomments(actualite_id)   
// }, [refreshing])

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
