export default function activePartyReducer(state={},action) {
    switch (action.type) {
        case 'SET_PARTY': 
            return action.party
        case 'ACTIVATE_PARTY':
            return {...state, active: true}
        default: 
            return state
    }
}