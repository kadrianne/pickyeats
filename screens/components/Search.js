import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useFormField from '../../hooks/useFormField'
import { Button } from 'react-native-elements'
import makeQuery from '../../helpers/makeQuery'
import Colors from '../../styles/Colors'

import { YELP_API_TOKEN } from '../../env.config'

const yelpAPI = `https://api.yelp.com/v3/businesses/search?`

export default function Search() {

    const dispatch = useDispatch()
    const [searchText, handleChange] = useFormField()

    const setRestaurantList = (results) => {
        dispatch({type:'SET_RESTAURANTS', restaurants: results['businesses']})
    }

    const handleSubmit = () => {
        
        const query = makeQuery({
            location: searchText
        })
        
        fetch(`${yelpAPI}${query}`,{
            headers: {
                'Authorization': `Bearer ${YELP_API_TOKEN}`
            }
        }).then(response => response.json())
            .then(setRestaurantList)

    }

    return (
        <>
            <TextInput
                name='search'
                style={styles.search}
                placeholder='Enter Location'
                onChangeText={handleChange}
                value={searchText}
            />
            <Button buttonStyle={styles.button} onPress={handleSubmit} titleStyle={styles.buttonText} type='outline' title='ENTER'/>
        </>
    )
}

const styles = StyleSheet.create({
    search: {
        borderColor: Colors.burgundy,
        width: 250,
        borderWidth: 1,
        borderRadius: 100,
        paddingLeft: 10,
        alignContent: 'center',
        fontFamily: 'Raleway-Medium',
        fontSize: 16
    },    
    button: {
        borderColor: Colors.burgundy,
        borderWidth: 1,
        margin: 15
    },
    buttonText: {
        color: Colors.burgundy,
        fontSize: 24,
        fontFamily: 'Pompiere-Regular'
    }
})