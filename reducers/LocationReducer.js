export default function locationReducer(state='',action) {
    switch (action.type) {
        case 'NEW_LOCATION': 
            return action.searchTerm
        default: 
            return state
    }
}