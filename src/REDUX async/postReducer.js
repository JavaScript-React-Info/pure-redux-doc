
const initialPosts = [

]

export const postReducer = (state= initialPosts, action)=>{
    switch(action.type){
        case 'FETCH_POSTS': {
            return action.payload
        }
        default: 
            return state
    }
}