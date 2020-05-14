import React, { useState } from 'react'
import useFormField from '../../hooks/useFormField'
import { StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import makeQuery from '../../helpers/makeQuery'
import { GOOGLE_API_KEY } from '../../env.config'

export default function Search() {

    const [searchText, setSearchText, handleChange] = useFormField()

    const getPlacesList = () => {
        
    }

    const getLatLng = (results) => {
        const latitude = results['results'][0]['geometry']['location']['lat']
        const longitude = results['results'][0]['geometry']['location']['lng']

        getPlacesList()
    }

    const geocode = (searchURL) => {
        fetch(searchURL)
            .then(response => response.json())
            .then(getLatLng)
    }

    const handleSubmit = () => {
        const searchInput = {
            address: searchText,
            key: GOOGLE_API_KEY
        }

        const query = makeQuery(searchInput)
        const searchURL = `https://maps.googleapis.com/maps/api/geocode/json?${query}`
        
        geocode(searchURL)
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