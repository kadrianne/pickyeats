export default function activePartyReducer(state={},action) {
    switch (action.type) {
        case 'SET_PARTY': 
            return action.party
        default: 
            return state
    }
}