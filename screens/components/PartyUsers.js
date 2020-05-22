import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import { ListItem, Button } from 'react-native-elements'
import Colors from '../../styles/Colors'

export default function PartyUsers() {

    const dispatch = useDispatch()
    const partyUsers = useSelector(state => state.partyUsers)

    const handlePress = (user) => {
        dispatch({type:'REMOVE_USER', user: user})
    }

    const continueButton = () => {
        dispatch({type: 'SEARCH'})
    }

    const listUsers = () => {
        return partyUsers.map((user,index) => {
            return (
                <ListItem
                    key={index}
                    title={user.name}
                    subtitle={user.username}
                    titleStyle={{fontFamily: 'Raleway-Medium'}}
                    containerStyle={{borderRadius: 2}}
                    rightIcon={{ name: 'remove', color: Colors.burgundy, onPress: () => handlePress(user) }}
                    bottomDivider
                />
            )
        })
    }
    return (
        <>
        <View style={{width: 300, marginBottom: 15}}>
            <Text style={styles.subtext}>Added to Party:</Text> 
            {listUsers()}
        </View>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='CONTINUE' onPress={continueButton} />
        </>
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
    button: {
        backgroundColor: Colors.burgundy,
        marginHorizontal: 50,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    }
})