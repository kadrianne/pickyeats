import { combineReducers } from 'redux'
import navigation from './NavigationReducer'
import restaurantList from './RestaurantListReducer'
import currentRestaurant from './CurrentRestaurantReducer'

export default combineReducers({navigation,restaurantList,currentRestaurant})