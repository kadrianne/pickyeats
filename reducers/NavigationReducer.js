export default function navigationReducer(state='home',action) {
    switch (action.type) {
        case 'ACCOUNT': 
            return 'account',
        case 'MAIN': 
            return 'main',
        default: 
            return state
    }
}