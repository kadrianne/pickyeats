export default function loggedInUserReducer(state={},action) {
    switch (action.type) {
        case 'LOGGED_IN': 
            return action.user
        default: 
            return state
    }
}