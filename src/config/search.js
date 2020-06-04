import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export function search( props) {

    const categorieclicked = () => {
        props.navigation.navigate('Tabscreen', {
            screen: 'Stackscreen',
            params: {
                screen: 'Drawerscreen',
                params: {
                    screen: 'feed_home',
                    params: { issearching: true },
                }
            },
        })
    }
    return (
        <TouchableOpacity onPress={() => categorieclicked()}>
            <View >
                <Ionicons name="ios-search" size={30} style={styles.icons}/>
            </View>
        </TouchableOpacity>
    )
}
export default search

const styles = StyleSheet.create({
    icons: {
      color: '#d3d0d2',
      marginLeft: 13,
      marginRight: 13,
    },
  }
  );
