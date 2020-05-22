import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../styles/Colors'
import { ListItem, Button } from 'react-native-elements'

export default function MatchedRestaurants() {

    const matchedRestaurants = useSelector(state => state.matchedRestaurants)

    const listMatches = () => {
        return matchedRestaurants.map((restaurant,index) => {
            return (
                <ListItem
                    key={index}
                    title={restaurant.name}
                    // subtitle={user.username}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    // leftIcon={{ name: item.icon }}
                    containerStyle={{borderRadius: 2}}
                    // rightIcon={{ name: 'remove', color: Colors.burgundy, onPress: () => handlePress(user) }}
                    bottomDivider
                />
            )
        })
    }

    return (
        <View style={{width: 300, marginBottom: 15}}>
            <Text style={styles.subtext}>Matched Restaurants:</Text> 
            {listMatches()}
        </View>
    )
}

const styles = StyleSheet.create({
    subtext: {
        fontFamily: 'Raleway-SemiBold',
        textAlign: 'center',
        fontSize: 26,
        color: Colors.burgundy,
        marginVertical: 15
    },  
    // button: {
    //     backgroundColor: Colors.burgundy,
    //     marginHorizontal: 50,
    // },
    // buttonText: {
    //     color: Colors.white,
    //     fontSize: 30,
    //     fontFamily: 'Pompiere-Regular'
    // }
})