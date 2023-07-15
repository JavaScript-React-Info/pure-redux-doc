import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`;
  // Remember, the key names you give to combineReducers decides what the key names of your state object will be!
  todos: todosReducer,
  filters: filtersReducer
})

export default rootReducer