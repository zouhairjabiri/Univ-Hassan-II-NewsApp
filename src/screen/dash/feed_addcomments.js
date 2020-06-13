import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'galio-framework'

export function feed_addcomments(props) {
    const [comment, setcomment] = useState('')
    const [user_id, setuser_id] = useState(0)
    props.navigation.setOptions({
        headerTitle: () => <Text style={styles.Title}>Laissez un commentaire</Text>,
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
        const { actualite_id } = props.route.params
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
        props.navigation.navigate('feed_comments')
    }
    return (
        <View>
            <View style={styles.bord}>
                <TextInput placeholder="Écrire un commentaire ..."
                    style={styles.textInput}
                    placeholderTextColor={'#000000'}
                    value={comment}
                    multiline={true}
                    autoFocus = {true}
                    onChangeText={text => setcomment(text)}
                />
            </View>

            <View style={styles.button}>
                <Button onPress={addcomment} round size="small" color="#245591">
                    Confirmer
                    </Button>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    textInput: {
        fontSize: 15,
        color: '#000000',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    bord: {
        height: 120,
        borderWidth: 0.5,
        borderRadius: 12,
        marginTop: 50,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        alignItems: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
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
})
