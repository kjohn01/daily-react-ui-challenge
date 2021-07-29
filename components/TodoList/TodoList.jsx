import React from 'react';
import { TodoListProvider, useTodo } from './todoList-context';
import TodoItem from './TodoItem';
import styles from './todoList.module.scss';

export default function TodoList() {
  const { state: {todoList} } = useTodo();
  return (
    <TodoListProvider className={styles.root}>
      <ul>
        {
          todoList.map((todoItem) => <TodoItem key={todoItem.id} todoItem={todoItem} />)
        }
      </ul>
    </TodoListProvider>
  );
}
