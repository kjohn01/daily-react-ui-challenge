import React, { useMemo, useEffect } from 'react';
import { actions, useTodo } from '../todoList-context';
import TodoItem from './TodoItem';
import TodoInput from '../components/TodoInput';
import { fetchTodoItems } from '../database';
import styles from '../styles/todoList.module.scss';

export default function TodoList() {
  const { state: {todoList}, dispatch } = useTodo();
  const completedItems = useMemo(() => todoList.filter((todoItem) => todoItem.isCompleted === true), [todoList]);

  useEffect(() => {
    fetchTodoItems().then((items) => {
      dispatch({ 
        type: actions.OVERWRITE_TODO_ITEMS, 
        todoList: items
      });
    });
  }, [dispatch]);
  
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
          todoList.map((todoItem) => <TodoItem key={todoItem.itemId} todoItem={todoItem} />)
        }
      </ul>
      <TodoInput />
    </div>
  );
}