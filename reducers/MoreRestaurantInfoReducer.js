export default function moreRestaurantInfoReducer(state={},action) {
    switch (action.type) {
        case 'SET_INFO':
            return action.info
        case 'REMOVE_RESTAURANT':
            return {}
        default: 
            return state
    }
}