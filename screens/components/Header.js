import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header() {

    const dispatch = useDispatch()
    const activeParty = useSelector(state => state.activeParty)

    const partyPage = () => {
        if (activeParty.active === true) {
            dispatch({type: 'MY_PARTY'})
        } else {
            dispatch({type: 'NEW_PARTY'})
        }
    }

    return (
        <View style={styles.nav}>
            <Icon name='users' size={30} color="#990000" onPress={partyPage} />
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