export default function partyUsersReducer(state=[],action) {
    switch (action.type) {
        case 'ADD_USER': 
            return addUser(state, action)
        case 'REMOVE_USER':
            return state.filter(user => user !== action.user)
        case 'SET_USERS':
            return action.users
        case 'NEW_PARTY':
            return []
        default: 
            return state
    }
}

function addUser(users, action) {
    const isDuplicateUser = users.some(user => user.id === action.user.id)

    if (isDuplicateUser === false) {
        return [...users, action.user]
    } else {
        return users
    }
}