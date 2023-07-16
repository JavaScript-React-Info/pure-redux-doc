import store from "./store";

// sayHiOnDispatch: an enhancer that always logs 'Hi'! to the console every time an action is dispatched
// includeMeaningOfLife: an enhancer that always adds the field meaningOfLife: 42 to the value returned from getState()



// console.log('Dispatching actions');
// store.dispatch({type: 'todos/todoAdded', payload: 'Learn acout actions'});
// console.log('Dispatch Complete');


store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// log: 'Hi!'

console.log('State after dispatch: ', store.getState())
// log: {todos: [...], filters: {status, colors}, meaningOfLife: 42}