import { users } from "react-native-auth0"

export default function partyUsersReducer(state=[],action) {
    switch (action.type) {
        case 'ADD_USER': 
            return addUser(state, action)
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