import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { postReducer } from './postReducer'

//redux thunk -> it allows action creator to returna an object or function

export const postStore = createStore(postReducer, applyMiddleware(thunk))