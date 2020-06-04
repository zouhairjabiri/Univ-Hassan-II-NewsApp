import React from 'react'
import  {fetchcatego} from '../../config/fetchcatego';
import { View,Text, StyleSheet , TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export function Categorie(props) {
  props.navigation.setOptions({
    headerTitle:()=>  <View>
    <Text style={{color: '#d3d0d2',fontWeight:'bold',fontSize:20}}>{props.route.params.Categorie_nom}</Text>
     </View>,
    headerLeft : () => 
    <TouchableOpacity  onPress={() => { props.navigation.goBack()   }}>
    <Ionicons name="md-arrow-round-back"  size={30} style={styles.icons} />
    </TouchableOpacity>,
    headerStyle: {
      backgroundColor: '#245591',
    },
  })
  return (
    fetchcatego(props.route.params.Categorie_id,props)
  );

}
export default Categorie


const styles = StyleSheet.create({
   icons: {
    color: '#d3d0d2',
    marginLeft: 13,
    marginRight: 13,

  },
})
