import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { postReducer } from './postReducer'


//redux thunk -> it allows action creator to returna an object or function

export const postStore = createStore(postReducer, composeWithDevTools(applyMiddleware(thunk)))