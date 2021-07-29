import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { actions, useTodo } from './todoList-context';
import styles from './todoList.module.scss';

export default function TodoItem({ todoItem }) {
    const { id, isCompleted, label } = todoItem;
    const { dispatch } = useTodo();
    let cx = classNames.bind(styles);
    
    return (
        <li
            className={cx({ todoItem: true , completed: isCompleted })}
            onClick={() => dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId: id })}
            >
            {label}
            <button
                className={styles.delete}
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
