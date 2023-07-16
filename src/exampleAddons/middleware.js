export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('2')
  return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3')
  return next(action)
}

/* -------------------------------------------------------------------------- */
/*                              custom middleware                             */
/* -------------------------------------------------------------------------- */
// Redux middleware are written as a series of three nested functions

// export default function exampleMiddleware(storeSPI){
//   return function wrapDispatch(next){
//     return function handleAction(action){
//       // Do anything here: pass the action onwards with next(action),
//       // or restart the pipeline with storeAPI.dispatch(action)
//       // Can also use storeAPI.getState() here

//       return next(action)
//     }
//   }
// }

// Let's break down what these three functions do and what their arguments are.

//     exampleMiddleware: The outer function is actually the "middleware" itself. It will be called by applyMiddleware, and receives a storeAPI object containing the store's {dispatch, getState} functions. These are the same dispatch and getState functions that are actually part of the store. If you call this dispatch function, it will send the action to the start of the middleware pipeline. This is only called once.
//     wrapDispatch: The middle function receives a function called next as its argument. This function is actually the next middleware in the pipeline. If this middleware is the last one in the sequence, then next is actually the original store.dispatch function instead. Calling next(action) passes the action to the next middleware in the pipeline. This is also only called once
//     handleAction: Finally, the inner function receives the current action as its argument, and will be called every time an action is dispatched.


// in ES6
// const anotherExampleMiddleware = storeAPI => next => action => {
//   // Do something in here, when each action is dispatched

//   return next(action)
// }

/* -------------------------------------------------------------------------- */
/*                   Using Middleware to Enable Async Logic                   */
/* -------------------------------------------------------------------------- */
import {client} from '../api/client'

const delayedActionMiddleware = storeAPI => next => action => {
  if (action.type === 'todos/todoAdded') {
    setTimeout(() => {
      // Delay this action by one second
      next(action)
    }, 1000)
    return
  }

  return next(action)
}

const fetchTodosMiddleware = storeAPI => next => action => {
  if (action.type === 'todos/fetchTodos') {
    // Make an API call to fetch todos from the server
    client.get('todos').then(todos => {
      // Dispatch an action with the todos we received
      storeAPI.dispatch({ type: 'todos/todosLoaded', payload: todos })
    })
  }

  return next(action)
}


//Example async function middleware

const asyncFunctionMiddleware = storeAPI => next => action => {
  // If the "action" is actually a function instead...
  if (typeof action === 'function') {
    // then call the function and pass `dispatch` and `getState` as arguments
    return action(storeAPI.dispatch, storeAPI.getState)
  }

  // Otherwise, it's a normal action - send it onwards
  return next(action)
}


//------
const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

// Write a function that has `dispatch` and `getState` as arguments
const fetchSomeData = (dispatch, getState) => {
  // Make an async HTTP request
  client.get('todos').then(todos => {
    // Dispatch an action with the todos we received
    dispatch({ type: 'todos/todosLoaded', payload: todos })
    // Check the updated store state after dispatching
    const allTodos = getState().todos
    console.log('Number of todos after loading: ', allTodos.length)
  })
}

// Pass the _function_ we wrote to `dispatch`
store.dispatch(fetchSomeData)
// logs: 'Number of todos after loading: ###'