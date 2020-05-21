import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { ListItem } from 'react-native-elements'
import Colors from '../../styles/Colors'

export default function UserResults({ users, resetSearch }) {
    
    const dispatch = useDispatch()

    const handlePress = (user) => {
        dispatch({type:'ADD_USER', user: user})
        resetSearch()
    }

    const listUsers = () => {
        return users.map((user,index) => {
            return (
                <ListItem
                    key={index}
                    title={user.name}
                    subtitle={user.username}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    containerStyle={{borderRadius: 2}}
                    onPress={handlePress}
                    rightIcon={{ name: 'add', color: Colors.burgundy, onPress: () => handlePress(user) }}
                    bottomDivider
                />
            )
        })
    }
    return (
        <View style={styles.list}>
            <ScrollView nestedScrollEnabled={true}>
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