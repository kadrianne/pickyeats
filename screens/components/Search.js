import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useFormField from '../../hooks/useFormField'
import { StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import makeQuery from '../../helpers/makeQuery'
import { YELP_API_TOKEN } from '../../env.config'

const yelpAPI = `https://api.yelp.com/v3/businesses/search?`

export default function Search() {

    const dispatch = useDispatch()
    const [searchText, handleChange] = useFormField()

    const getRestaurantList = (results) => {
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
            .then(getRestaurantList)
        // const searchInput = {
        //     address: searchText,
        //     key: GOOGLE_API_KEY
        // }

        // const searchURL = `https://maps.googleapis.com/maps/api/geocode/json?${query}`
        
        // geocode(searchURL)
    }

    return (
        <>
            <TextInput
                name='search'
                style={styles.search}
                placeholder="Enter Location"
                onChangeText={handleChange}
                value={searchText}
            />
            <Button onPress={handleSubmit}/>
        </>
    )
}

const styles = StyleSheet.create({
    search: {
        width: 250,
        borderWidth: .5,
        borderRadius: 100,
        paddingLeft: 10
    }
})