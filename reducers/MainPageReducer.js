export default function mainPageReducer(state='party',action) {
    switch (action.type) {
        case 'NEW_ACCOUNT': 
            return 'new-account'
        case 'PROFILE': 
            return 'profile'
        case 'SEARCH': 
            return 'search'
        case 'PARTY': 
            return 'party'
        case 'SET_RESTAURANT':
            return 'restaurant'
        default: 
            return state
    }
}