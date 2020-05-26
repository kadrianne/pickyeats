import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../../styles/Colors'

export default function MatchOverlay({ removeRestaurantFromList }) {

    const dispatch = useDispatch()
    const currentRestaurant = useSelector(state => state.currentRestaurant)

    const handlePartyButton = () => {
        dispatch({type: 'MY_PARTY'})
        removeRestaurantFromList()
    }

    return (
        <>
        <Text style={styles.restaurantName}>{currentRestaurant.name.toUpperCase()}</Text>
        <View style={styles.matchView}>
            <Icon name='check-circle' size={60} color={Colors.primary} style={{marginTop: 15}} />
            <Text style={styles.matchText}>IT'S A MATCH!</Text>
            <Button buttonStyle={styles.partyButton} titleStyle={styles.buttonText} title='VIEW IN MY PARTY' onPress={handlePartyButton} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    matchView: {
        alignItems: 'center',
        borderColor: Colors.orange,
        borderRadius: 5,
        borderWidth: 3,
        width: '100%'
    },
    restaurantName: {
        fontFamily: 'LondrinaShadow-Regular',
        backgroundColor: Colors.orange,
        textAlign: 'center',
        fontSize: 48,
        marginBottom: 10,
        borderRadius: 5,
        color: Colors.burgundy,
        width: '100%'
    },
    matchText: {
        color: Colors.primary,
        fontFamily: 'LondrinaShadow-Regular',
        fontSize: 56,
        padding: 5,
        textAlign: 'center',
    },
    partyButton: {
        backgroundColor: Colors.burgundy,
        marginHorizontal: 50,
        marginVertical: 15
    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    }
})