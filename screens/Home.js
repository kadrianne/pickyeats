import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, ScrollView } from 'react-native'
import Colors from '../styles/Colors'
import { Button } from 'react-native-elements'
import AccountForm from './components/AccountForm'

export default function Home() {
  
  const [ accountForm, setAccountForm ] = useState('')
  
  const displayLogin = () => {
    setAccountForm('login')
  }

  const displaySignup = () => {
    setAccountForm('signup')
  }

  const displayForm = {
    'signup': <AccountForm type='signup' />,
    'login': <AccountForm type='login' />,
    '': null
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.body}>
        <Image style={{height: 250, aspectRatio: 7/4, marginBottom: -5 }} source={require('../assets/logo/pickyeats.png')} />
        <View style={styles.container}>
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type="clear" title="LOGIN" onPress={displayLogin} />
            <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type="clear" title="SIGN UP" onPress={displaySignup} />
        </View>
        {/* <ScrollView> */}
          {displayForm[accountForm]}
        {/* </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    minHeight: 748,
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: Colors.orange,
  },
  button: {
    marginTop: 0,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colors.burgundy,
    fontSize: 30,
    fontFamily: 'Pompiere-Regular'
  },
  container: {
    flexDirection: 'row',
  }
})