import React from 'react';
import { useTodo } from './todoList-context';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import styles from './todoList.module.scss';

export default function TodoList() {
  const { state: {todoList} } = useTodo();
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Todo List</h3>

      <div className={styles.taskCount}>
        <p className={styles.total}>{`${todoList.length} tasks`}</p>
        <p className={styles.done}>{`${todoList.filter((todoItem) => todoItem.isCompleted === true).length} done`}</p>
        <p className={styles.togo}>{`${todoList.filter((todoItem) => todoItem.isCompleted === false).length} togo`}</p>
      </div>
      
      <ul className={styles.list}>
        {
          todoList.map((todoItem) => <TodoItem key={todoItem.id} todoItem={todoItem} />)
        }
      </ul>
      <TodoInput />
    </div>
  );
}
