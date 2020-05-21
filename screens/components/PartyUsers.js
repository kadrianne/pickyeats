import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { ListItem } from 'react-native-elements'
import Colors from '../../styles/Colors'

export default function PartyUsers() {

    const partyUsers = useSelector(state => state.partyUsers)

    const listUsers = () => {
        return partyUsers.map((user,index) => {
            return (
                <ListItem
                    key={index}
                    title={user.name}
                    subtitle={user.username}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    // leftIcon={{ name: item.icon }}
                    containerStyle={{borderRadius: 2}}
                    rightIcon={{ name: 'remove', color: Colors.burgundy}}
                    bottomDivider
                />
            )
        })
    }
    return (
        <View style={{width: 300}}>
            <Text style={styles.subtext}>Added to Party:</Text> 
            {listUsers()}
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
})