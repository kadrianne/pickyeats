import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput } from 'react-native'
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

    const updateUserParty = (partyID) => {
        fetch(`${BACKEND_URL}/users/${loggedInUser.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({...loggedInUser, active_party: partyID})
        }).then(response => response.json())
            .then(console.log)
    }

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
            .then(results => {
                setParty(results)
                updateUserParty(results.id)
            })
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

    useEffect(() => {
        if (loggedInUser.active_party !== null && !activeParty.id) {
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
        <ScrollView contentContainerStyle={styles.body}>
            <Text style={styles.heading}>START A PARTY</Text>
            <View style={styles.form}>
            { loggedInUser.active_party === null
                ? <>
                    <Input
                        label='PARTY NAME'
                        labelStyle={{color: Colors.burgundy}}
                        inputContainerStyle={styles.field}
                        value={title}
                        onChangeText={handleTitleChange}
                    />
                    <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type='outline' title='CREATE' onPress={createParty} />
                </>
                : <>
                    <Text style={styles.title}>{activeParty.title}</Text>
                    <Text style={styles.subtext}>WHO'S INVITED?</Text>
                    <TextInput
                        name='search'
                        style={styles.search}
                        placeholder='Enter name, email, or phone #'
                        onChangeText={handleChange}
                        value={searchText}
                    />
                    { searchResults.length > 0 ? <UserResults users={searchResults} /> : searchText.length > 0 ? <Text>No Users Found</Text> : null }
                </>
            }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: Colors.orange,
        padding: 25,
        borderRadius: 5,
        width: 350,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    field: {
        width: 280,
        paddingHorizontal: 0,
        borderColor: Colors.darkOrange,
    },
    body: {
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'LondrinaShadow-Regular',
        backgroundColor: Colors.burgundy,
        textAlign: 'center',
        fontSize: 56,
        margin: 15,
        width: 350,
        borderRadius: 5,
        color: Colors.white
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
        borderColor: Colors.burgundy,
        borderWidth: 1,
        marginHorizontal: 50,
    },
    buttonText: {
        color: Colors.burgundy,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    }
})