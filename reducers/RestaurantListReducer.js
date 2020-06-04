export default function restaurantListReducer(state=[],action) {
    switch (action.type) {
        case 'SET_RESTAURANTS':
            return action.restaurants
        case 'REMOVE_RESTAURANT':
            return state.filter(restaurant => restaurant !== action.restaurant)
        case 'END_PARTY':
            return []
        default: 
            return state
    }
}