import React, { useMemo } from 'react';
import { useTodo } from './todoList-context';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import styles from './todoList.module.scss';

export default function TodoList() {
  const { state: {todoList} } = useTodo();
  const completedItems = useMemo(() => todoList.filter((todoItem) => todoItem.isCompleted === true), [todoList]);
  
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Todo List</h3>

      <div className={styles.taskCount}>
        <p className={styles.total}>{`${todoList.length} tasks`}</p>
        <p className={styles.done}>{`${completedItems.length} done`}</p>
        <p className={styles.togo}>{`${todoList.length - completedItems.length} togo`}</p>
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
