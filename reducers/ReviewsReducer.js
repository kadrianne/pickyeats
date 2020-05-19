export default function reviewsReducer(state=[],action) {
    switch (action.type) {
        case 'SET_REVIEWS':
            return action.reviews
        case 'REMOVE_RESTAURANT':
            return []
        default: 
            return state
    }
}