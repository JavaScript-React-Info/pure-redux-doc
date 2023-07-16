import React from 'react'
import TodoListItem from './TodoListItem';
import {useSelector} from 'react-redux'

//useSelector hook, which lets your React components read data from the Redux store.

// useSelector accepts a single function, which we call a selector function. A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.

const selectTodos = state => state.todos

const TodoList = () => {
  const todos = useSelector(selectTodos)

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList

//useSelector automatically subscribes to the Redux store for us! That way, any time an action is dispatched, it will call its selector function again right away. If the value returned by the selector changes from the last time it ran, useSelector will force our component to re-render with the new data. All we have to do is call useSelector() once in our component, and it does the rest of the work for us.

// const todos = useSelector(state => state.todos), we can directely write selector fcntion
