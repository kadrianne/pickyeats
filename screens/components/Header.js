import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../styles/Colors'
import { Icon } from 'react-native-elements/FontAwesome'

export default function Header() {
    return (
        <View style={styles.nav}>
            <Icon name="rocket" />
            {/* <Image style={{height: '45%', width: 350}} source={require('../assets/logo/pickyeats.png')} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
      height: 100,
    //   alignItems: 'center',
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