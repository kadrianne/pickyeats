import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../styles/Colors'
import { ListItem, Avatar } from 'react-native-elements'

export default function MatchedRestaurants() {

    const matchedRestaurants = useSelector(state => state.matchedRestaurants)

    const listMatches = () => {
        return matchedRestaurants.map((restaurant,index) => {
            const userAvatars = () => restaurant.liked_restaurants.map((like,index) => {
                const splitName = like.user.name.split(' ')
                const initials = splitName.map(name => name[0]).join('')
                
                return (
                    <Avatar
                        key={index}
                        size="small"
                        rounded
                        title={initials}
                        activeOpacity={0.7}
                        containerStyle={styles.avatar}
                        titleStyle={{color: Colors.white}}
                    />
                )}
            )
            return (
                <ListItem
                    key={index}
                    title={restaurant.name}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    containerStyle={{borderRadius: 2}}
                    bottomDivider
                    rightAvatar={<>{userAvatars()}</>}
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
    avatar: {
        backgroundColor: Colors.orange,
        borderWidth: 1,
        borderColor: Colors.white,
        marginHorizontal: -2
    }
})