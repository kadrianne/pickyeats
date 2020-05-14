import React, { useState } from 'react'
import useFormField from '../../hooks/useFormField'
import { StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import makeQuery from '../../helpers/makeQuery'
// import { GOOGLE_API_KEY } from 'react-native-dotenv'

export default function Search() {

    const [searchText, setSearchText, handleChange] = useFormField()
    const handleSubmit = () => {
        let searchInput = {
            key: 'AIzaSyD4ppF4tBc8B13FEnBpJwQ3w8EumG4i1xw',
            address: searchText
        }
        const query = makeQuery(searchInput)
        console.log(query)
        // console.log(GOOGLE_API_KEY)
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