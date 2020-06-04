import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { fetchcomments } from '../../config/fetchcomments';

export function feed_comments(props) {

    const [actualite_id, setactualite_id] = useState(props.route.params.actualite_id)
    props.navigation.setOptions({
        headerTitle: () => <Text style={styles.Title}>Commentaire</Text>,
        headerStyle: {
            backgroundColor: '#245591',
        },
        headerLeft: () =>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                <AntDesign name="back" size={30} style={styles.icons} />
            </TouchableOpacity>,
        headerRight: () =>
            <TouchableOpacity onPress={() => { props.navigation.navigate('feed_addcomments', {actualite_id}) }}>
                <AntDesign name="pluscircle" size={30} style={styles.icons} />
            </TouchableOpacity>,
    })


    return (
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
