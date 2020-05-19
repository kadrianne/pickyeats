import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../styles/Colors'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import Search from './components/Search'
import getRandomInteger from '../helpers/getRandomInteger'

export default function Main() {

  const dispatch = useDispatch()
  const restaurantList = useSelector(state => state.restaurantList)
  const mainPage = useSelector(state => state.mainPage)

  const assignRestaurant = () => {
    const objectPosition = getRandomInteger(0,restaurantList.length)
    dispatch({type:'SET_RESTAURANT', restaurant: restaurantList[objectPosition]})
  }
  
  const displaySection = {
    'search': <Search />,
    'restaurant': <RestaurantCard />
  }

  useEffect(() => {
    if (restaurantList.length !== 0) {
      assignRestaurant()
    }
  },[restaurantList])

    return (
        <SafeAreaView style={styles.body}>
          <Header />
          {displaySection[mainPage]}
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