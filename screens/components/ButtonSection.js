import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Overlay } from 'react-native-elements'
import Colors from '../../styles/Colors'

import { BACKEND_URL } from '../../env.config'

export default function ButtonSection() {
    
    const dispatch = useDispatch()
    const currentRestaurant = useSelector(state => state.currentRestaurant)
    const activeParty = useSelector(state => state.activeParty)
    const loggedInUser = useSelector(state => state.loggedInUser)
    const [visible, setVisible] = useState(false)

    const toggleOverlay = () => {
        setVisible(!visible)
    }

    const removeRestaurantFromList = () => {
        dispatch({ type:'REMOVE_RESTAURANT', restaurant: currentRestaurant })
    }

    const addRestaurantToLiked = () => {
        const likedRestaurant = {
            yelp_id: currentRestaurant.id,
            name: currentRestaurant.name,
            party: activeParty.id,
            user: loggedInUser.id
        }

        fetch(`${BACKEND_URL}/liked-restaurants/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(likedRestaurant)
        })
    }

    const postMatchedRestaurant = (matchedRestaurant) => {
        fetch(`${BACKEND_URL}/matched-restaurants/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(matchedRestaurant)
        }).then(response => response.json())
            .then(console.log)
    }
      
    const checkMatchedRestaurants = (likedRestaurants) => {
        const matchedRestaurant = likedRestaurants.find(restaurant => restaurant.yelp_id == currentRestaurant.id)

        if (matchedRestaurant) {
            dispatch({type: 'ADD_MATCH', restaurant: matchedRestaurant})
            postMatchedRestaurant(matchedRestaurant)
            toggleOverlay()
        } else {
            removeRestaurantFromList()
        }

    }

    const handleLike = () => {
        fetch(`${BACKEND_URL}/api/party-restaurants?party_id=${activeParty.id}`)
            .then(response => response.json())
            .then(checkMatchedRestaurants)
            .then(addRestaurantToLiked)
    }
    
    const handleDislike = () => {
        removeRestaurantFromList()
    }

    const handlePartyButton = () => {
        dispatch({type: 'MY_PARTY'})
        removeRestaurantFromList()
    }

    const handleBackdropPress = () => {
        toggleOverlay()
        removeRestaurantFromList()
    }

    return (
        <View style={styles.buttonView}>
            <Button
                raised
                buttonStyle={styles.button} type='solid'
                icon={{
                    name: 'thumb-down',
                    size: 35,
                    color: Colors.orange
                }}
                onPress={handleDislike}
            />
            <Button
                raised
                buttonStyle={styles.button} type='solid'
                icon={{
                    name: 'thumb-up',
                    size: 35,
                    color: Colors.orange
                }}
                onPress={handleLike}
            />
            <Overlay overlayStyle={styles.match} isVisible={visible} onBackdropPress={handleBackdropPress}>
                <Text style={styles.restaurantName}>{currentRestaurant.name.toUpperCase()}</Text>
            <View style={styles.matchView}>
                <Text style={styles.matchText}>IT'S A MATCH!</Text>
                <Button buttonStyle={styles.partyButton} titleStyle={styles.buttonText} title='GO TO PARTY' onPress={handlePartyButton} />
            </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        marginTop: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: Colors.burgundy,
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    match: {
        backgroundColor: Colors.white,
        width: 350,
        alignItems: 'center',
    },
    matchView: {
        alignItems: 'center',
        backgroundColor: Colors.orange,
        borderColor: Colors.burgundy,
        borderRadius: 5,
        borderWidth: 3,
    },
    restaurantName: {
        fontFamily: 'LondrinaShadow-Regular',
        backgroundColor: Colors.burgundy,
        textAlign: 'center',
        fontSize: 48,
        marginBottom: 10,
        borderRadius: 5,
        color: Colors.white,
        width: '100%'
    },
    matchText: {
        color: Colors.burgundy,
        fontFamily: 'LondrinaShadow-Regular',
        fontSize: 72,
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