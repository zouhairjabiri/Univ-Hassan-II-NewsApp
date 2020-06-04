import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'galio-framework'

export function feed_addcomments(props) {
    const [finish, setfinish] = useState(false)
    const [comment, setcomment] = useState('')
    const [user_id, setuser_id] = useState(0)
    props.navigation.setOptions({
        headerTitle: () => <Text style={styles.Title}>Ajouter un Commetaire</Text>,
        headerStyle: {
            backgroundColor: '#245591',
        },
        headerLeft: () =>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                <AntDesign name="back" size={30} style={styles.icons} />
            </TouchableOpacity>,
    })
    token = async () => {
        try {
            const getid = await AsyncStorage.getItem('@id');

            setuser_id(getid)
        }
        catch (error) { console.error(error) }
    };

    useEffect(() => {
        token()
    }, [])

    const addcomment = () => {
        console.log(user_id)
        console.log(comment)
        console.log(props.route.params.actualite_id)
        const {actualite_id} = props.route.params
        const url = `https://herokuuniv.herokuapp.com/api/Comment/`
        fetch(url, {
          method: 'POST',
          headers: {
            Accept:
              'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Token 6819607706a0d0c9702f16fb77750667e8ab684a'
          },
          body: JSON.stringify({
            Commentaire: comment,
            User: user_id,
            Actualite: actualite_id,
          }),
        }).then(res => res.json())
        setfinish(true)
    }
    return (
        <View style={styles.container}>

            {finish ?
                <View>

                    <Text style={{ marginTop: 90}}>Merci</Text>
                    <Button onPress={() => { props.navigation.goBack() }} style={{ marginTop: 80 }} round size="small" color="#0000B2">
                        GO back
                    </Button>
                </View>
                :
                <View>

                    <TextInput placeholder="Commentaire"
                        style={styles.textInput}
                        placeholderTextColor={'#000000'}
                        value={comment}
                        onChangeText={text => setcomment(text)} 
                    />
                    
                    <Button onPress={addcomment} style={{ marginTop: 10 }} round size="small" color="#0000B2">
                        Ajouter
                    </Button>
                </View>
            }
        </View>
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

    },
    container: {

        alignContent: 'center',
        alignItems: 'center',

    },
    textInput: {
        marginTop: 90,
        height: 170,
        width: '75%',
        borderBottomColor: '#d3d0d2',
        borderBottomWidth: 1,
        marginBottom: 25,
        fontSize: 15,
        color: '#000000'
    },

})
