import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { updateTodoItems } from './database';

const initialState = {
    todoList: []
};

const todoListContext = React.createContext();

const actions = {
    ADD_TODO_ITEM: "ADD_TODO_ITEM",
    EDIT_TODO_ITEM: "EDIT_TODO_ITEM",
    REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
    TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
    OVERWRITE_TODO_ITEMS: "OVERWRITE_TODO_ITEMS"
};

const reducer = (state, action) => {
    let { todoList } = state;
    switch (action.type) {
      case actions.ADD_TODO_ITEM:
        todoList.push({
          itemId: new Date().valueOf().toString(),
          label: action.todoItemLabel,
          isCompleted: false
        });
        updateTodoItems(todoList);
        return { todoList };
        
      case actions.OVERWRITE_TODO_ITEMS:
        return { todoList: action.todoList };

      case actions.EDIT_TODO_ITEM: 
        todoList = todoList.map((todoItem) =>
          todoItem.itemId === action.todoItemId
            ? { 
                ...todoItem, 
                label: action.todoItemLabel,
                isCompleted: false
              }
            : todoItem
        );
        updateTodoItems(todoList);
        return { todoList };

      case actions.REMOVE_TODO_ITEM: 
        todoList = todoList.filter((todoItem) => todoItem.itemId !== action.todoItemId);
        updateTodoItems(todoList);
        return { todoList };

      case actions.TOGGLE_COMPLETED: 
        todoList = todoList.map((todoItem) =>
          todoItem.itemId === action.todoItemId
            ? { ...todoItem, isCompleted: !todoItem.isCompleted }
            : todoItem
        )
        updateTodoItems(todoList);
        return { todoList };
  
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

