import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useFormField from '../../hooks/useFormField'
import { Input, Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import UserResults from './UserResults'
import { BACKEND_URL } from '../../env.config'

export default function Search() {

    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loggedInUser)
    const activeParty = useSelector(state => state.activeParty)
    const [ title, handleTitleChange ] = useFormField('')
    const [ searchText, handleChange ] = useFormField()
    const [ searchResults, setSearchResults ] = useState([])

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

    const getParty = () => {
        fetch(`${BACKEND_URL}/parties/${loggedInUser.active_party}`)
            .then(response => response.json())
            .then(setParty)
    }

    const searchFriend = () => {
        fetch(`${BACKEND_URL}/api/users?search=${searchText}`)
            .then(response => response.json())
            .then(setSearchResults)
    }

    const getUser = () => {
        // fetch(`${BACKEND_URL}/users/${user.id}/`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // }).then(response => response.json())
        //     .then(updateUserParty)
    }

    const updateUserParty = (user) => {
        fetch(`${BACKEND_URL}/users/${user.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(console.log)
    }

    useEffect(() => {
        if (loggedInUser.active_party !== null) {
            updateUserParty(loggedInUser)
        } else {
            getParty()
        }
    },[loggedInUser])

    useEffect(() => {
        if (searchText == '') {
            setSearchResults([])
        } else {
            searchFriend()
        }
    },[searchText])

    return (
        <View style={styles.body}>
            { loggedInUser.active_party === null
                ? <>
                    <Text style={styles.heading}>Start a PARTY</Text>
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
                </>
                : <>
                    <Text style={styles.heading}>WHO'S COMING? {activeParty.title}</Text>
                        <TextInput
                            name='search'
                            style={styles.search}
                            placeholder='Enter name, email, or phone #'
                            onChangeText={handleChange}
                            value={searchText}
                        />
                    { searchResults.length > 0 ? <UserResults users={searchResults} /> : searchText.length > 0 ? <Text>No Users Found</Text> : null }
            </> }
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