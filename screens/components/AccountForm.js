import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Colors from '../../styles/Colors'

import { BACKEND_URL } from '../../env.config'

export default function AccountForm({ type }) {

    return (
        <View style={styles.form}>
            {type === 'signup' ? <Input
                placeholder='First Name'
                containerStyle={styles.container}
                inputContainerStyle={{...styles.field, paddingHorizontal: 2}}
                leftIcon={{ type: 'font-awesome', name: 'user', size: 24, color: Colors.darkOrange }}
            /> : null }
            {type === 'signup' ? <Input
                placeholder='Phone Number'
                inputContainerStyle={styles.field}
                leftIcon={{ type: 'font-awesome', name: 'phone', size: 24, color: Colors.darkOrange }}
            /> : null }
            <Input
                placeholder='Email'
                inputContainerStyle={styles.field}
                leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20, color: Colors.darkOrange }}
            />
            <Input
                type='password'
                placeholder='Password'
                inputContainerStyle={{...styles.field, paddingHorizontal: 3}}
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 24, color: Colors.darkOrange }}
            />
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='SUBMIT' />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: Colors.white,
        padding: 30,
        borderRadius: 10,
        marginBottom: 25,
    },
    container: {
        fontFamily: 'Raleway-Regular'
    },
    field: {
        width: 250,
        borderColor: Colors.darkOrange,
    },
    button: {
        backgroundColor: Colors.burgundy,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: 'Pompiere-Regular'
    }
  })