
import {createStore, compose, applyMiddleware} from 'redux'
import { includeMeaningOfLife, sayHiOnDispatch } from './exampleAddons/enhancers'
import rootReducer from './reducer'

//createStore can also accept a preloadedState value as its second argument. You could use this to add initial data when the store is created, such as values that were included in an HTML page sent from the server, or persisted in localStorage and read back when the user visits the page again, like this:

// let preloadedState
// const persistedTodosString = localStorage.getItem('todos')

// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString)
//   }
// }

// const store = createStore(rootReducer, preloadedState)

// export default store;

// const store = createStore(rootReducer, undefined, sayHiOnDispatch);
// export default store;


//createStore only accepts one enhancer as its third argument
//  the Redux core includes a compose function that can be used to merge multiple enhancers together

// const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife);

// const store = createStore(rootReducer, undefined, composedEnhancer);

// export default store;


// If you don't have any preloadedState to pass in, you can pass the enhancer as the second argument instead:
// const store = createStore(rootReducer, storeEnhancer)

// Enhancers are powerful because they can override or replace any of the store's methods: dispatch, getState, and subscribe.

// But, much of the time, we only need to customize how dispatch behaves. It would be nice if there was a way to add some customized behavior when dispatch runs.


/* -------------------------------------------------------------------------- */
/*                                 middleware                                 */
/* -------------------------------------------------------------------------- */
// import { print1, print2, print3 } from './exampleAddons/middleware'

// const middlewareEnhancer = applyMiddleware(print1, print2, print3)

// // Pass enhancer as the second arg, since there's no preloadedState
// const store = createStore(rootReducer, middlewareEnhancer)

// export default store

/* -------------------------------------------------------------------------- */
/*                              custom middleware                             */
/* -------------------------------------------------------------------------- */
const loggerMiddleware = storeAPI => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
  }

//-----------------
const alwaysReturnHelloMiddleware = storeAPI => next => action => {
    const originalResult = next(action)
    // Ignore the original result, return something else
    return 'Hello!'
  }
  
  const middlewareEnhancer = applyMiddleware(alwaysReturnHelloMiddleware)
  const store = createStore(rootReducer, middlewareEnhancer)
  
  const dispatchResult = store.dispatch({ type: 'some/action' })
  console.log(dispatchResult)
  // log: 'Hello!'
//--------------------------
const delayedMessageMiddleware = storeAPI => next => action => {
    if (action.type === 'todos/todoAdded') {
      setTimeout(() => {
        console.log('Added a new todo: ', action.payload)
      }, 1000)
    }
  
    return next(action)
  }