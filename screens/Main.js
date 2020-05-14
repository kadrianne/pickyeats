import React from 'react'
import { SafeAreaView, StyleSheet, View, Image } from 'react-native'
import Colors from '../styles/Colors'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

export default function Main() {
    return (
        <SafeAreaView style={styles.body}>
          <Header />
          <RestaurantCard />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
      height: '100%',
      alignItems: 'center',
      backgroundColor: Colors.white,
    },
    button: {
      margin: 10,
    },
    buttonText: {
      color: Colors.white,
      fontSize: 30,
      fontFamily: 'Pompiere-Regular'
    },
    container: {
      flexDirection: 'row'
    }
  })