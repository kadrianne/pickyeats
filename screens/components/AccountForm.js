import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Colors from '../../styles/Colors'
import useFormField from '../../hooks/useFormField'

import { BACKEND_URL } from '../../env.config'

export default function AccountForm({ type }) {
    
    const [ name, handleNameChange ] = useFormField('')
    const [ phone, handlePhoneChange ] = useFormField('')
    const [ email, handleEmailChange ] = useFormField('')
    const [ password, handlePasswordChange ] = useFormField('')

    const createAccount = () => {
        const accountData = { name, phone, email, password}

        fetch(`${BACKEND_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(accountData)
        }).then(console.log)

    }

    const loginUser = () => {
        const loginData = { email, password }

        fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
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
                placeholder='Email'
                inputContainerStyle={styles.field}
                leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20, color: Colors.darkOrange }}
                value={email}
                onChangeText={handleEmailChange}
            />
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
        marginBottom: 25,
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