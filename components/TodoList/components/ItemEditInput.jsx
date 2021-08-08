import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { PenFill } from 'react-bootstrap-icons';
import { actions, useTodo } from '../todoList-context';
import styles from '../styles/todoItem.module.scss';

export default function ItemEditInput({ todoItem, toggleIsEditing }) {
    const { dispatch } = useTodo();
    const { itemId, isCompleted, label } = todoItem;
    const [currentValue, setCurrentValue] = useState(label);

    const handleSubmit = () => {
        dispatch({ 
            type: actions.EDIT_TODO_ITEM, 
            todoItemId: itemId,
            todoItemLabel: currentValue
        });
        toggleIsEditing();
    };

    if (isCompleted) return <></>;
    return (
        <>
            <PenFill color="grey" size={32} className={styles.editIcon} />
            <div className={styles.input}>
                <input
                    type="text"
                    autoFocus
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && handleSubmit()}
                    onBlur={toggleIsEditing}
                />
                <hr className={styles.hr} />
            </div>
            <Button onClick={handleSubmit} size="sm" className={styles.doneEdit}>
                Done
            </Button>
        </>
    );
}

ItemEditInput.propTypes = {
    todoItem: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired,
    toggleIsEditing: PropTypes.func.isRequired
}
