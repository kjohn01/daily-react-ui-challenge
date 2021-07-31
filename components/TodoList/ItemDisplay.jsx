import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Check } from 'react-bootstrap-icons';
import classNames from 'classnames/bind';
import { actions, useTodo } from './todoList-context';
import styles from './todoList.module.scss';

export default function ItemDisplay({ todoItem, toggleIsEditing }) {
    const { dispatch } = useTodo();
    const { id, isCompleted, label } = todoItem;
    const [isRippling, setIsRippling] = useState(false);
    let cx = classNames.bind(styles);

    const toggleCompleted = useCallback(() => {
        dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId: id })
    }, [dispatch, id]);

    const startRipple = useCallback(() => {
        setIsRippling(true);
        setTimeout(() => {
            setIsRippling(false);
            toggleCompleted();
        }, 300);
    }, [toggleCompleted]);

    return (
        <>
            {
                isCompleted
                ? <Check 
                    color="mediumaquamarine" 
                    size={32} 
                    className={styles.check} 
                    onClick={() => toggleCompleted()} 
                />
                : <button
                    className={cx({ checkMark: true, ripple: isRippling })}
                    onClick={startRipple}
                >
                    {" "}
                </button>
            }
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
