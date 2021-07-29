import React from 'react';
import PropTypes from 'prop-types';
import { actions, useTodo } from './todoList-context';

export default function TodoItem({ todoItem }) {
    const { id, isCompleted, label } = todoItem;
    const { dispatch } = useTodo();
    
    return (
        <li
            className={`todoItem ${isCompleted ? "completed" : ""}`}
            onClick={() => dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId: id })}
            >
            {label}
            <button
                className="delete"
                onClick={() => dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId: id })}
            >
                X
            </button>
        </li>
    );
}

TodoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired
};
