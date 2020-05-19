export default function navigationReducer(state='home',action) {
    switch (action.type) {
        case 'LOGGED_IN': 
            return 'main'
        default: 
            return state
    }
}