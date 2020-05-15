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

  const removeRestaurantFromList = (objectPosition) => {
    dispatch({type:'REMOVE_RESTAURANT', restaurant: restaurantList[objectPosition]})
  }
  
  const renderCard = () => {
    const objectPosition = getRandomInteger(0,restaurantList.length)
    // removeRestaurantFromList(objectPosition)
    return <RestaurantCard restaurant={restaurantList[objectPosition]} />
  }
  
  // useEffect(() => {
  //     console.log(restaurantList)
  // },[restaurantList])

    return (
        <SafeAreaView style={styles.body}>
          <Header />
          {restaurantList.length === 0 ? <Search /> : renderCard()}
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