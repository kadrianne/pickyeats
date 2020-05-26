export default function showMoreInfoReducer(state=false,action) {
    switch (action.type) {
        case 'TOGGLE_INFO':
            return !state
        default: 
            return state
    }
}