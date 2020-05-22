export default function matchedRestaurantsReducer(state=[],action) {
    switch (action.type) {
        case 'ADD_MATCH':
            return [...state, action.restaurant]
        case 'SET_MATCHES':
            return action.restaurants
        default: 
            return state
    }
}