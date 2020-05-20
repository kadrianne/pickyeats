import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import useFormField from '../../hooks/useFormField'
import { Button } from 'react-native-elements'
// import makeQuery from '../../helpers/makeQuery'
import Colors from '../../styles/Colors'

export default function Search() {

    // const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.loggedInUser)
    const [searchText, handleChange] = useFormField()

    // const setRestaurantList = (results) => {
    //     dispatch({type:'SET_RESTAURANTS', restaurants: results.businesses})
    // }

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