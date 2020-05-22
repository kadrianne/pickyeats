import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../styles/Colors'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import Search from './components/Search'
import Party from './components/Party'
import MyParty from './components/MyParty'
import getRandomInteger from '../helpers/getRandomInteger'
import { BACKEND_URL } from '../env.config'
import { YELP_API_TOKEN } from '../env.config'

const yelpAPI = `https://api.yelp.com/v3/businesses/search?`

export default function Main() {

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const activeParty = useSelector(state => state.activeParty)
  const restaurantList = useSelector(state => state.restaurantList)
  const mainPage = useSelector(state => state.mainPage)

  const assignRestaurant = () => {
    const objectPosition = getRandomInteger(0,restaurantList.length)
    dispatch({ type:'SET_RESTAURANT', restaurant: restaurantList[objectPosition] })
  }

  const setRestaurantList = (results) => {
    dispatch({ type:'SET_RESTAURANTS', restaurants: results.businesses })
  }

  const getRestaurantList = (query) => {
    fetch(`${yelpAPI}${query}`,{
      headers: {
          'Authorization': `Bearer ${YELP_API_TOKEN}`
      }
    }).then(response => response.json())
      .then(setRestaurantList)
  }

  const updateUserParty = (user, party) => {
    fetch(`${BACKEND_URL}/users/${user.id}/`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({active_party: party.id})
    }).then(response => response.json())
      .then(console.log)
  }

  const setParty = (party) => {
    dispatch({ type: 'SET_PARTY', party })
  }

  const getParty = () => {
    fetch(`${BACKEND_URL}/parties/${loggedInUser.active_party}`)
      .then(response => response.json())
      .then(setParty)
  }

  const setMatchedRestaurants = (restaurants) => {
    dispatch({ type: 'SET_MATCHES', restaurants })
  }

  const getMatchedRestaurants = () => {
    fetch(`${BACKEND_URL}/api/matched-restaurants?party_id=${activeParty.id}`)
      .then(response => response.json())
      .then(setMatchedRestaurants)

  }

  const displaySection = {
    'new-party': <Party updateUserParty={updateUserParty} setParty={setParty} />,
    'search': <Search getRestaurantList={getRestaurantList} setRestaurantList={setRestaurantList} updateUserParty={updateUserParty} />,
    'restaurant': <RestaurantCard />,
    'my-party': <MyParty assignRestaurant={assignRestaurant} />
  }

  useEffect(() => {
    if (restaurantList.length !== 0) {
      assignRestaurant()
    }
  },[restaurantList])

  useEffect(() => {
    if (loggedInUser.active_party === null){
      dispatch({ type: 'NEW_PARTY' })
    } else {
        getParty()
    }
  },[])

  useEffect(() => {
    if (activeParty.id) {
      if (activeParty.active === true) {
        getRestaurantList(activeParty.search_query)
        getMatchedRestaurants()
      } else {
        dispatch({ type: 'NEW_PARTY' })
      }
    }
  },[activeParty])

  return (
      <SafeAreaView style={styles.body}>
        <Header />
        { displaySection[mainPage] }
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