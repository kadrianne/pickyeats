import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import useFormField from '../../hooks/useFormField'
import AsyncStorage from '@react-native-community/async-storage'

import { BACKEND_URL } from '../../env.config'

export default function AccountForm({ type }) {

    const [ name, handleNameChange ] = useFormField('')
    const [ phone, handlePhoneChange ] = useFormField('')
    const [ username, handleUsernameChange ] = useFormField('')
    const [ password, handlePasswordChange ] = useFormField('')

    const dispatch = useDispatch()

    const handleLogin = (results) => {
        if (results.user) {
            dispatch({type:'LOGGED_IN', user: results.user})
            AsyncStorage.setItem('@storage_Key', results.token)
        }
    }

    // const getToken = async () => {
    //     const value = await AsyncStorage.getItem('@storage_Key')
    //     console.log(value)
    // }
    // getToken()
    
    const createAccount = () => {
        const accountData = { name, phone, username, password}

        fetch(`${BACKEND_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(accountData)
        }).then(response => response.json())
        .then(handleLogin)

    }

    const loginUser = () => {
        const loginData = { username, password }

        fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginData)
        }).then(response => response.json())
        .then(handleLogin)
    }

    const handleSubmit = () => {
        if (type === 'signup') {
            createAccount()
        } else if (type === 'login') {
            loginUser()
        }
    }

    return (
        <View style={styles.form}>
            <Input
                placeholder='Email'
                inputContainerStyle={styles.field}
                leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20, color: Colors.darkOrange }}
                value={username}
                onChangeText={handleUsernameChange}
            />
            {type === 'signup' ? <Input
                placeholder='Full Name'
                inputContainerStyle={{...styles.field, paddingHorizontal: 2}}
                leftIcon={{ type: 'font-awesome', name: 'user', size: 24, color: Colors.darkOrange }}
                value={name}
                onChangeText={handleNameChange}
            /> : null }
            {type === 'signup' ? <Input
                placeholder='Phone Number'
                inputContainerStyle={styles.field}
                leftIcon={{ type: 'font-awesome', name: 'phone', size: 24, color: Colors.darkOrange }}
                value={phone}
                onChangeText={handlePhoneChange}
            /> : null }
            <Input
                secureTextEntry={true}
                placeholder='Password'
                inputContainerStyle={{...styles.field, paddingHorizontal: 3}}
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 24, color: Colors.darkOrange }}
                value={password}
                onChangeText={handlePasswordChange}
            />
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title='SUBMIT' onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: Colors.white,
        padding: 30,
        borderRadius: 10,
        marginVertical: 15,
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
        fontSize: 26,
        fontFamily: 'Pompiere-Regular'
    }
  })