import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { actions, useTodo } from './todoList-context';
import styles from './todoList.module.scss';

export default function ItemDisplay({ todoItem, toggleIsEditing }) {
    const { dispatch } = useTodo();
    const { id, isCompleted, label } = todoItem;
    let cx = classNames.bind(styles);
    return (
        <>
            <label className={styles.checkbox}>
                <input 
                    type="checkbox" 
                    onChange={() => dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId: id })}
                />
                <span className={styles.checkMark} />
            </label>
            <p 
                className={cx({ label: true, completed: isCompleted })}
                onClick={() => !isCompleted && toggleIsEditing()}
            >
                {label}
            </p>
            <Button
                variant="light"
                size="sm"
                className={styles.delete}
                onClick={() => dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId: id })}
            >
                X
            </Button>
        </>
    );
}

ItemDisplay.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired,
    toggleIsEditing: PropTypes.func.isRequired
}
