import {createStore} from 'redux'
import { postReducer } from './postReducer'

export const postStore = createStore(postReducer)