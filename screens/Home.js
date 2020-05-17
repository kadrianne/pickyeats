import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, ScrollView } from 'react-native'
import Colors from '../styles/Colors'
import { Button, ButtonGroup } from 'react-native-elements'
import AccountForm from './components/AccountForm'

export default function Home() {
  
  const [ accountForm, setAccountForm ] = useState('')
  const [ selectedIndex, setSelectedIndex ] = useState()
  
  const buttons = ['LOGIN', 'SIGN UP']
  const buttonForms = ['login','signup']

  const handleDisplay = (selectedIndex) => {
    setSelectedIndex(selectedIndex)
    setAccountForm(buttonForms[selectedIndex])
  }

  const displayForm = {
    'login': <AccountForm type='login' />,
    'signup': <AccountForm type='signup' />
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.body}>
        <Image style={{height: 250, aspectRatio: 7/4, marginBottom: -5 }} source={require('../assets/logo/pickyeats.png')} />
        <View style={styles.container}>
          <ButtonGroup
            onPress={handleDisplay}
            selectedIndex={selectedIndex}
            buttons={buttons}
            textStyle={styles.buttonText}
            innerBorderStyle={{color: Colors.orange}}
            selectedButtonStyle={styles.selectedButton}
            selectedTextStyle={{color: Colors.burgundy}}
            containerStyle={styles.buttonGroup}
          />
            </View>
          {displayForm[accountForm]}
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
  buttonGroup: {
    width: 300,
    marginBottom: 10,
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
  },
  buttonText: {
    color: Colors.white,
    paddingTop: 10,
    fontSize: 30,
    fontFamily: 'Pompiere-Regular'
  },
  selectedButton: {
    backgroundColor: Colors.orange, 
    borderStyle: 'solid', 
    borderColor: Colors.burgundy, 
    borderWidth: 1, 
    borderBottomWidth: 0
  },
  container: {
    flexDirection: 'row',
  }
})