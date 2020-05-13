import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Colors from '../../styles/Colors'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header() {
    return (
        <View style={styles.nav}>
            <Image style={{height: 35, width: 35}} source={require('../../assets/logo/pickyeats-icon.png')} />
            <Icon name='user-circle' size={30} color="#990000" />
            {/* <Image style={{height: '45%', width: 350}} source={require('../assets/logo/pickyeats.png')} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
      height: 60,
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.orange,
    },
    // button: {
    //   margin: 10,
    // },
    // buttonText: {
    //   color: Colors.white,
    //   fontSize: 30,
    //   fontFamily: 'Pompiere-Regular'
    // },
    // container: {
    //   flexDirection: 'row'
    // }
  })