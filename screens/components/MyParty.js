import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../styles/Colors'
import { Button, Avatar, Tooltip } from 'react-native-elements'
import MatchedRestaurants from './MatchedRestaurants'
import { BACKEND_URL } from '../../env.config'

export default function MyParty({ assignRestaurant }) {

    const activeParty = useSelector(state => state.activeParty)
    const partyUsers = useSelector(state => state.partyUsers)
    const matchedRestaurants = useSelector(state => state.matchedRestaurants)

    const displayUserAvatars = () => {
        return partyUsers.map((user,index) => {
            const splitName = user.name.split(' ')
            const initials = splitName.map(name => name[0]).join('')

                return (
                    <Avatar
                        key={index}
                        size="medium"
                        rounded
                        title={initials}
                        activeOpacity={0.7}
                        containerStyle={styles.avatar}
                        titleStyle={{color: Colors.darkOrange}}
                    />
            )
        })
    }

    return (
        <>
        <View style={styles.body}>
            <Text style={styles.heading}>{activeParty.title}</Text>
            <Text style={styles.subtext}>In This Party:</Text>
            <View style={styles.avatarList}>{displayUserAvatars()}</View>
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='VIEW RESTAURANTS' onPress={assignRestaurant} />
            { matchedRestaurants.length > 0 ? <MatchedRestaurants /> : <Text style={styles.subtext}>No matches yet!</Text> }
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.orange,
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        width: 350,
        alignItems: 'center',
    },
    field: {
        width: 280,
        paddingHorizontal: 0,
        borderColor: Colors.darkOrange,
    },
    heading: {
        fontFamily: 'LondrinaShadow-Regular',
        textAlign: 'center',
        fontSize: 56,
        margin: 15,
        width: 350,
        borderRadius: 5,
        color: Colors.burgundy
    },
    title: {
        fontFamily: 'LondrinaShadow-Regular',
        textAlign: 'center',
        fontSize: 48,
        lineHeight: 48,
        color: Colors.black,
        marginBottom: 15
    },
    subtext: {
        fontFamily: 'Raleway-SemiBold',
        textAlign: 'center',
        fontSize: 26,
        color: Colors.burgundy,
        marginBottom: 15
    },
    search: {
        borderColor: Colors.burgundy,
        width: 250,
        borderWidth: 2,
        borderRadius: 100,
        paddingLeft: 10,
        alignContent: 'center',
        fontFamily: 'Raleway-Medium',
        fontSize: 16,
        marginBottom: 20
    },    
    button: {
        backgroundColor: Colors.burgundy,
        marginHorizontal: 25,
        marginBottom: 25
    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    },
    avatarList: {
        flexDirection: 'row',
        marginBottom: 10
    },
    avatar: {
        backgroundColor: Colors.white,
        borderColor: Colors.orange,
        borderWidth: 1,
        marginHorizontal: -3,
    }
})