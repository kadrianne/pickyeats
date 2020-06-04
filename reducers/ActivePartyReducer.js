export default function activePartyReducer(state={},action) {
    switch (action.type) {
        case 'SET_PARTY': 
            return action.party
        case 'ACTIVATE_PARTY':
            return {...state, active: true, search_query: action.query}
        case 'END_PARTY':
            return {}
        default: 
            return state
    }
}