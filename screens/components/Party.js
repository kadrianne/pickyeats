import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useFormField from '../../hooks/useFormField'
import { Input, Button } from 'react-native-elements'
// import makeQuery from '../../helpers/makeQuery'
import Colors from '../../styles/Colors'
import { BACKEND_URL } from '../../env.config'

export default function Search() {

    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loggedInUser)
    const [ title, handleTitleChange ] = useFormField('')
    const [ searchText, handleChange ] = useFormField()

    const setParty = (results) => {
        dispatch({type: 'SET_PARTY', party: results})
    }

    const createParty = () => {
        const partyData = {
            title: title,
            active: true
        }

        fetch(`${BACKEND_URL}/parties/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(partyData)
        }).then(response => response.json())
            .then(setParty)
    }

    useEffect(() => {
        if (loggedInUser.active_party !== null) {
            fetch(`${BACKEND_URL}/users/${loggedInUser.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loggedInUser)
            }).then(response => response.json())
                .then(console.log)
        }
    },[loggedInUser])

    const handleSubmit = () => {
        
        // const query = makeQuery({
        //     location: searchText,
        //     open_now: true
        // })
        
        // fetch(`${yelpAPI}${query}`,{
        //     headers: {
        //         'Authorization': `Bearer ${YELP_API_TOKEN}`
        //     }
        // }).then(response => response.json())
        //     .then(setRestaurantList)

    }

    return (
        <View style={styles.body}>
            { loggedInUser.active_party === null
                ? <>
                    <Text style={styles.heading}>START A PARTY</Text>
                    <View style={styles.form}>
                        <Input
                            label='PARTY NAME'
                            labelStyle={{color: Colors.burgundy}}
                            inputContainerStyle={styles.field}
                            value={title}
                            onChangeText={handleTitleChange}
                        />
                        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='CREATE' onPress={createParty} />
                    </View>
                    <TextInput
                        name='search'
                        style={styles.search}
                        placeholder='Enter name, email, or phone #'
                        onChangeText={handleChange}
                        value={searchText}
                    />
                    <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='FIND FRIEND' onPress={handleSubmit} />
                </> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: Colors.orange,
        padding: 30,
        borderRadius: 10,
        marginBottom: 30,
    },
    field: {
        width: 250,
        borderColor: Colors.darkOrange,
    },
    body: {
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'Raleway-SemiBold',
        textAlign: 'center',
        fontSize: 36,
        margin: 50,
        color: Colors.burgundy
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
        marginVertical: 10,
        marginHorizontal: 40
    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    }
})