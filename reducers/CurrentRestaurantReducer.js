export default function currentRestaurantReducer(state={},action) {
    switch (action.type) {
        case 'SET_RESTAURANT':
            return action.restaurant
        default: 
            return state
    }
}