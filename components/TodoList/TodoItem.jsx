import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { actions, useTodo } from './todoList-context';
import styles from './todoList.module.scss';

export default function TodoItem({ todoItem }) {
    const { id, isCompleted, label } = todoItem;
    const { dispatch } = useTodo();
    let cx = classNames.bind(styles);
    
    return (
        <li className={styles.todoItem}>
            <label className={styles.checkbox}>
                <input 
                    type="checkbox" 
                    onChange={() => dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId: id })}
                />
                <span className={styles.checkMark} />
            </label>
            <p className={cx({ label, completed: isCompleted })}>
                {label}
            </p>
            {
                !isCompleted && <Button
                variant="light"
                size="sm"
                className={styles.delete}
                onClick={() => dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId: id })}
                >
                    X
                </Button>
            }
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
