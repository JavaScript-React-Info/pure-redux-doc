import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'

import './api/server'

import store from './store';
import { fetchTodos } from './features/todos/todosSlice'
import ReduxApp from './REDUX async/App'
import { asyncStore } from './REDUX async/store'


store.dispatch(fetchTodos())

//Instead, we have to specifically tell React-Redux what store we want to use in our components. We do this by rendering a <Provider> component around our entire <App>, and passing the Redux store as a prop to <Provider>. After we do this once, every component in the application will be able to access the Redux store if it needs to.
ReactDOM.render(
  <Provider store={asyncStore}>
   <ReduxApp/>
  </Provider>,
  document.getElementById('root')
)
