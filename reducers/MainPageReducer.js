export default function mainPageReducer(state='',action) {
    switch (action.type) {
        case 'PROFILE': 
            return 'profile'
        case 'MY_PARTY':
            return 'my-party'
        case 'SEARCH': 
            return 'search'
        case 'NEW_PARTY': 
            return 'new-party'
        case 'SET_RESTAURANT':
            return 'restaurant'
        default: 
            return state
    }
}