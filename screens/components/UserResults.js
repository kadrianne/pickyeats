import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { ListItem } from 'react-native-elements'
import Colors from '../../styles/Colors'

export default function UserResults({ users }) {

    const listUsers = () => {
        return users.map((user,index) => {
            return (
                <ListItem
                    key={index}
                    title={user.name}
                    // leftIcon={{ name: item.icon }}
                    bottomDivider
                    // chevron
                />
            )
        })
    }
    return (
        <View style={styles.list}>
            {listUsers()}
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: Colors.orange,
        padding: 30,
        width: 400
    }
})