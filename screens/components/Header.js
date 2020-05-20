import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header() {
    return (
        <View style={styles.nav}>
            <Icon name='users' size={30} color="#990000" />
            <Image style={{height: 60, width: 170}} source={require('../../assets/logo/Logo.png')} />
            <Icon name='user' size={30} color="#990000" />
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
    }
  })