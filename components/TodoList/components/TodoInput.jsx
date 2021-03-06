import React, { useState, useCallback } from 'react';
import { Plus } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { actions, useTodo } from '../todoList-context';
import styles from '../styles/todoInput.module.scss';

export default function TodoInput() {
    const [inputValue, setInputValue] = useState("");
    const { dispatch } = useTodo();

    const handleSubmit = useCallback((inputValue) => {
        dispatch({ 
            type: actions.ADD_TODO_ITEM, 
            todoItemLabel: inputValue
        });
        setInputValue("");
    }, [dispatch]);

    return (
        <div className={styles.todoInput}>
            <Plus color="darkorange" size={32} />
            <input
                type="text"
                className={styles.input}
                value={inputValue}
                placeholder={"New todo item..."}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSubmit(inputValue)}
            />
            <Button onClick={handleSubmit} size="sm" className={styles.add}>Add</Button>
        </div>
    );
}
