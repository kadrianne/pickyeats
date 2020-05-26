import { combineReducers } from 'redux'
import navigation from './NavigationReducer'
import restaurantList from './RestaurantListReducer'
import currentRestaurant from './CurrentRestaurantReducer'
import loggedInUser from './LoggedInUserReducer'
import mainPage from './MainPageReducer'
import reviews from './ReviewsReducer'
import moreRestaurantInfo from './MoreRestaurantInfoReducer'
import activeParty from './ActivePartyReducer'
import partyUsers from './PartyUsersReducer'
import matchedRestaurants from './MatchedRestaurantsReducer'
import showMoreInfo from './ShowMoreInfoReducer'

export default combineReducers({
    navigation,
    restaurantList,
    currentRestaurant,
    loggedInUser,
    mainPage,
    reviews,
    moreRestaurantInfo,
    activeParty,
    partyUsers,
    matchedRestaurants,
    showMoreInfo
})