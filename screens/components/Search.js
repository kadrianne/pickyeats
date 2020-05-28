import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useFormField from '../../hooks/useFormField'
import { Button } from 'react-native-elements'
import makeQuery from '../../helpers/makeQuery'
import Colors from '../../styles/Colors'
import { BACKEND_URL } from '../../env.config'

export default function Search({ updateUserParty }) {

    const dispatch = useDispatch()
    const activeParty = useSelector(state => state.activeParty)
    const partyUsers = useSelector(state => state.partyUsers)
    const [searchText, handleChange] = useFormField()

    const postQueryToParty = (query) => {
        fetch(`${BACKEND_URL}/parties/${activeParty.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({active: true, search_query: query})
        })
    }

    const handleSubmit = () => { 
        const query = makeQuery({
            location: searchText,
            open_now: true
        })

        postQueryToParty(query)
        partyUsers.forEach(user => updateUserParty(user,activeParty))
        dispatch({ type: 'ACTIVATE_PARTY', query })
    }

    return (
        <>
        <Text style={styles.heading}>START A PARTY</Text>
        <View style={styles.form}>
            <Text style={styles.title}>{activeParty.title}</Text>
            <Text style={styles.subtext}>WHERE ARE WE LOOKING?</Text>
            <TextInput
                name='search'
                style={styles.search}
                placeholder='Enter Location'
                onChangeText={handleChange}
                value={searchText}
            />
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='FIND FOOD NOW' onPress={handleSubmit} />
        </View>
        </>
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
        fontSize: 16
    },    
    button: {
        backgroundColor: Colors.burgundy,
        margin: 25
    },
    buttonText: {
        color: Colors.white,
        fontSize: 30,
        fontFamily: 'Pompiere-Regular'
    }
})