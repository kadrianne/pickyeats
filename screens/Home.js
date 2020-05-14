import React from 'react'
import { SafeAreaView, StyleSheet, View, Image } from 'react-native'
import Colors from '../styles/Colors'
import { Button } from 'react-native-elements'

export default function Home() {
    return (
        <SafeAreaView style={styles.body}>
            <Image style={{height: '45%', width: 350}} source={require('../assets/logo/pickyeats.png')} />
            <View style={styles.container}>
                <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type="clear" title="LOGIN" />
                <Button buttonStyle={styles.button} titleStyle={styles.buttonText} type="clear" title="SIGN UP" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
      height: '100%',
      alignItems: 'center',
      backgroundColor: Colors.orange,
    },
    button: {
      margin: 10,
    },
    buttonText: {
      color: Colors.burgundy,
      fontSize: 30,
      fontFamily: 'Pompiere-Regular'
    },
    container: {
      flexDirection: 'row'
    }
  })