import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { actions, useTodo } from './todoList-context';
import styles from './todoList.module.scss';

export default function TodoInput() {
    const [inputValue, setInputValue] = useState("");
    const { dispatch } = useTodo();

    const handleSubmit = () => {
        dispatch({ 
            type: actions.ADD_TODO_ITEM, 
            todoItemLabel: inputValue
        });
        setInputValue("");
    };

    return (
        <div className={styles.todoInput}>
            <Plus color="darkorange" size={30} />
            <input
                type="text"
                value={inputValue}
                placeholder={"New todo item..."}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSubmit()}
            />
            <Button onClick={handleSubmit} size="sm" className={styles.add}>Add</Button>
        </div>
    );
}
