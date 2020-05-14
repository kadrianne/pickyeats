import { combineReducers } from 'redux'
import navigation from './NavigationReducer'
import restaurantList from './RestaurantListReducer'

export default combineReducers({navigation,restaurantList})