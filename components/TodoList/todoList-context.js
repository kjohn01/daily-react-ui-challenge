import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const todoListContext = React.createContext();

const initialState = {
    todoList: []
};

const actions = {
    ADD_TODO_ITEM: "ADD_TODO_ITEM",
    EDIT_TODO_ITEM: "EDIT_TODO_ITEM",
    REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
    TOGGLE_COMPLETED: "TOGGLE_COMPLETED"
};

const reducer = (state, action) => {
    console.log(action.type);
    switch (action.type) {
      case actions.ADD_TODO_ITEM:
        return {
          todoList: [
            ...state.todoList,
            {
              id: new Date().valueOf().toString(),
              label: action.todoItemLabel,
              isCompleted: false
            }
          ]
        };
      case actions.EDIT_TODO_ITEM: 
        return {
          todoList: state.todoList.map((todoItem) =>
            todoItem.id === action.todoItemId
              ? { 
                  ...todoItem, 
                  label: action.todoItemLabel,
                  isCompleted: false
                }
              : todoItem
          )
        }
      case actions.REMOVE_TODO_ITEM: 
        return { 
          todoList: state.todoList.filter((todoItem) => todoItem.id !== action.todoItemId) 
        };
      
      case actions.TOGGLE_COMPLETED: 
        return { 
          todoList: state.todoList.map((todoItem) =>
            todoItem.id === action.todoItemId
              ? { ...todoItem, isCompleted: !todoItem.isCompleted }
              : todoItem
          )
        };
  
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const TodoListProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <todoListContext.Provider value={value}>{children}</todoListContext.Provider>;
};

TodoListProvider.propTypes = {
    children: PropTypes.node.isRequired
};

const useTodo = () => {
    const context = React.useContext(todoListContext);
    if (context === undefined) throw new Error('useTodo must be used within a TodoListProvider');
    return context;
};

export { actions, TodoListProvider, useTodo };

