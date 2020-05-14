import { combineReducers } from 'redux'
import navigation from './NavigationReducer'
import location from './LocationReducer'

export default combineReducers({navigation,location})