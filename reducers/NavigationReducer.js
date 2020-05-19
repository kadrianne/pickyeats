export default function navigationReducer(state='home',action) {
    switch (action.type) {
        case 'ACCOUNT': 
            return 'account'
        case 'LOGGED_IN': 
            return 'main'
        default: 
            return state
    }
}