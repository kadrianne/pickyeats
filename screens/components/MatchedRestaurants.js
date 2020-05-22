import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../styles/Colors'
import { ListItem } from 'react-native-elements'

export default function MatchedRestaurants() {

    const matchedRestaurants = useSelector(state => state.matchedRestaurants)

    const listMatches = () => {
        return matchedRestaurants.map((restaurant,index) => {
            return (
                <ListItem
                    key={index}
                    title={restaurant.name}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    containerStyle={{borderRadius: 2}}
                    bottomDivider
                />
            )
        })
    }

    return (
        <View style={styles.list}>
            <Text style={styles.subtext}>Matched Restaurants:</Text> 
            { listMatches() }
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: 300,
        marginBottom: 25,
    },
    subtext: {
        fontFamily: 'Raleway-SemiBold',
        textAlign: 'center',
        fontSize: 26,
        color: Colors.burgundy,
        marginVertical: 15
    },  
})