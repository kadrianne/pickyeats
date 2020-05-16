import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-native-elements'
import Colors from '../../styles/Colors'

import { BACKEND_URL } from '../../env.config'

export default function ButtonSection() {
    
    const dispatch = useDispatch()
    const currentRestaurant = useSelector(state => state.currentRestaurant)

    const removeRestaurantFromList = () => {
        dispatch({type:'REMOVE_RESTAURANT', restaurant: currentRestaurant})
    }

    const addRestaurantToLiked = () => {
        const likedRestaurant = {
            yelp_id: currentRestaurant.id,
            name: currentRestaurant.name,
            party_id: 1,
            user_id: 2
        }

        fetch(`${BACKEND_URL}/users`)
        //     .then(response => response.json())
        //     .then(console.log)
        // // fetch(`${BACKEND_URL}/liked-restaurants`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(likedRestaurant)
        // })
        // .then(response => response.json())
        //     .then(console.log)
    }
      
    const handleLike = () => {
        removeRestaurantFromList()
        addRestaurantToLiked()
    }
    
    const handleDislike = () => {
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
    }
})