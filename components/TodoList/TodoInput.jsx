import React, { useState } from 'react';
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
        <>
            <input
                type="text"
                className={styles.input}
                value={inputValue}
                placeholder={"Add your todo item here"}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSubmit()}
            />
            <button onClick={handleSubmit} className={styles.add}>Add</button>
        </>
    );
}
