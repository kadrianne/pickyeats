import { combineReducers } from 'redux'
import navigation from './NavigationReducer'
import restaurantList from './RestaurantListReducer'
import currentRestaurant from './CurrentRestaurantReducer'
import loggedInUser from './LoggedInUserReducer'
import mainPage from './MainPageReducer'

export default combineReducers({navigation,restaurantList,currentRestaurant,loggedInUser,mainPage})