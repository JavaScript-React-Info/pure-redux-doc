import {createStore, applyMiddleware} from 'redux'
import store from '../store';
import { decrement } from './action';
import { counterReducer } from './reducer'

// middleware catches the action before it hits the reducer
const myLoggerMiddleWare = (storeAPI) => (next) => (action) => {
    
    return next(action); //this tell the app to pass the action to next middleware or reducer if this is last
}

const secondMiddleware = storeAPI => next => action => {
   
    return next(action);
}

const capAt10 =storeAPI => next => action => {
   
    if(storeAPI.getState() >= 10){
        return next({type: 'counter/decrement'})
    } else {
       return next(action)
    } 
     
     
}

export const asyncStore = createStore(counterReducer, applyMiddleware(myLoggerMiddleWare, secondMiddleware, capAt10))