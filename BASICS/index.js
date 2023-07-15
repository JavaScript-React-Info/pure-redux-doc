//In order to update values immutably, your code must make copies of existing objects/arrays, and then modify the copies.
//Redux expects that all state updates are done immutably.

const obj = {
    a: {
      // To safely update obj.a.c, we have to copy each piece
      c: 3
    },
    b: 2
  }
  
  const obj2 = {
    // copy obj
    ...obj,
    // overwrite a
    a: {
      // copy obj.a
      ...obj.a,
      // overwrite c
      c: 42
    }
  }
  
  const arr = ['a', 'b']
  // Create a new copy of arr, with "c" appended to the end
  const arr2 = arr.concat('c')
  
  // or, we can make a copy of the original array:
  const arr3 = arr.slice()
  // and mutate the copy:
  arr3.push('c')

  /* -------------------------------------------------------------------------- */
  /*                              Redux Terminology                             */
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Actions -------------------------------- */
//   An action is a plain JavaScript object that has a type field. You can think of an action as an event that describes something that happened in the application.

// The type field should be a string that gives this action a descriptive name, like "todos/todoAdded". We usually write that type string like "domain/eventName", where the first part is the feature or category that this action belongs to, and the second part is the specific thing that happened.

// An action object can have other fields with additional information about what happened. By convention, we put that information in a field called payload.

// A typical action object might look like this:

// const addTodoAction = {
//   type: 'todos/todoAdded',
//   payload: 'Buy milk'
// }


/* -------------------------------- Reducers -------------------------------- */
//A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState. You can think of a reducer as an event listener which handles events based on the received action (event) type.

//Reducers must always follow some specific rules:
// They should only calculate the new state value based on the state and action arguments
// They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
// They must not do any asynchronous logic, calculate random values, or cause other "side effects"

const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/incremented') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}

/* --------------------------------- strore --------------------------------- */
// The current Redux application state lives in an object called the store .
// The store is created by passing in a reducer, and has a method called getState that returns the current state value:

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}

/* -------------------------------- Dispatch -------------------------------- */
// The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the updated value:

store.dispatch({ type: 'counter/incremented' })

console.log(store.getState())
// {value: 1}

/* -------------------------------- Selectors ------------------------------- */
// Selectors are functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data:

const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2


/* -------------------------------------------------------------------------- */
/*                        Core Concepts and Principles                        */
/* -------------------------------------------------------------------------- */

/* ------------------------- Single Source of Truth ------------------------- */
// The global state of your application is stored as an object inside a single store. Any given piece of data should only exist in one location, rather than being duplicated in many places.

// This makes it easier to debug and inspect your app's state as things change, as well as centralizing logic that needs to interact with the entire application.


/* --------------------------- State is Read-only --------------------------- */
// The only way to change the state is to dispatch an action, an object that describes what happened.

// This way, the UI won't accidentally overwrite data, and it's easier to trace why a state update happened. Since actions are plain JS objects, they can be logged, serialized, stored, and later replayed for debugging or testing purposes.


/* -------------- Changes are Made with Pure Reducer Functions -------------- */
//To specify how the state tree is updated based on actions, you write reducer functions. Reducers are pure functions that take the previous state and an action, and return the next state. Like any other functions, you can split reducers into smaller functions to help do the work, or write reusable reducers for common tasks.



/* -------------------------------------------------------------------------- */
/*                              DataFlow in Redux                             */
/* -------------------------------------------------------------------------- */
// For Redux specifically, we can break these steps into more detail:

//     Initial setup:
//         A Redux store is created using a root reducer function
//         The store calls the root reducer once, and saves the return value as its initial state
//         When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.
//     Updates:
//         Something happens in the app, such as a user clicking a button
//         The app code dispatches an action to the Redux store, like dispatch({type: 'counter/incremented'})
//         The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state
//         The store notifies all parts of the UI that are subscribed that the store has been updated
//         Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
//         Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen