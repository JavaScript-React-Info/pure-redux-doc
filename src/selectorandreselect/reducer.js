
const initialState = {
    users: [],
    userName: ''
}

const userReducer = (state = initialState, action) => {
   switch(action.type){
    case 'ADD_USER': {
        return {
            ...state,
            users: [...state.users, state.userName]
        }
    }
    case 'CHANGE_USERNAME': {
        return {
            ...state,
            userName: action.payload
        }
    }
    default: 
        return state
   }
}

export default userReducer;