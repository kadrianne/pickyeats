export default function navigationReducer(state='main',action) {
    switch (action.type) {
        case 'LOGGED_IN': 
            return 'main'
        default: 
            return state
    }
}