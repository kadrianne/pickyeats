export default function loggedInUserReducer(state={},action) {
    switch (action.type) {
        case 'LOGGED_IN': 
            return action.user
        case 'SET_PARTY':
            return {...state, active_party: action.party.id}
        case 'END_PARTY':
            return {...state, active_party: null}
        default: 
            return state
    }
}