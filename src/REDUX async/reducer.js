


export const counterReducer = (state= 0, action)=>{
    console.log("reducer ran to check when it will ran", action.type);
    switch(action.type){
        case 'counter/increment': {
            return state +1
        }
        case 'counter/decrement': {
            return state -1
        }
        default:
            return state
    }
}