import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Check } from 'react-bootstrap-icons';
import classNames from 'classnames/bind';
import { actions, useTodo } from '../todoList-context';
import styles from '../styles/todoItem.module.scss';

export default function ItemDisplay({ todoItem, toggleIsEditing }) {
    const { dispatch } = useTodo();
    const { itemId, isCompleted, label } = todoItem;
    const [isRippling, setIsRippling] = useState(false);
    let cx = classNames.bind(styles);

    const toggleCompleted = useCallback(() => {
        dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId: itemId })
    }, [dispatch, itemId]);

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
                ? <div className={styles.checkMark}>
                    <Check 
                        color="mediumaquamarine" 
                        size={32}  
                        onClick={() => toggleCompleted()} 
                    />
                </div>
                : <button
                    className={cx({ checkBox: true, ripple: isRippling })}
                    onClick={startRipple}
                >
                    {" "}
                </button>
            }
            <div className={cx({ label: true, completed: isCompleted })}>
                <p onClick={() => !isCompleted && toggleIsEditing()}>
                    {label}
                </p>
                <hr className={styles.hr} />
            </div>
            <Button
                variant="light"
                size="sm"
                className={styles.delete}
                onClick={() => dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId: itemId })}
            >
                X
            </Button>
        </>
    );
}

ItemDisplay.propTypes = {
    todoItem: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired,
    toggleIsEditing: PropTypes.func.isRequired
}
