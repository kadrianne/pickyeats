import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Colors from '../../styles/Colors'

export default function UserResults({ users }) {

    const listUsers = () => {
        return users.map((user,index) => {
            return (
                <ListItem
                    key={index}
                    title={user.name}
                    subtitle={user.username}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    // leftIcon={{ name: item.icon }}
                    containerStyle={{borderRadius: 2}}
                    rightIcon={{ name: 'add', color: Colors.burgundy}}
                    bottomDivider
                />
            )
        })
    }
    return (
        <View style={styles.list}>
            <ScrollView>
                {listUsers()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: 300,
        maxHeight: 250,
    }
})