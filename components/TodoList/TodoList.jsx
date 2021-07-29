import React from 'react';
import { useTodo } from './todoList-context';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import styles from './todoList.module.scss';

export default function TodoList() {
  const { state: {todoList} } = useTodo();
  return (
    <div className={styles.root}>
      <ul>
        {
          todoList.map((todoItem) => <TodoItem key={todoItem.id} todoItem={todoItem} />)
        }
      </ul>
      <TodoInput />
    </div>
  );
}
