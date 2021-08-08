import React, { useMemo, useEffect } from 'react';
import { actions, useTodo } from '../todoList-context';
import TodoItem from './TodoItem';
import TodoInput from '../components/TodoInput';
import { fetchTodoItems } from '../database';
import styles from '../styles/todoList.module.scss';

export default function TodoList() {
  const { state: { todoList }, dispatch } = useTodo();
  const completedItems = useMemo(() => {
    if (todoList && todoList.length > 0) return todoList.filter((todoItem) => todoItem.isCompleted === true);
    return todoList;
  }, [todoList]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const list  = useMemo(() => todoList.length > 0 && todoList.map((todoItem) => <TodoItem key={todoItem.itemId} todoItem={todoItem} />), [todoList, todoList.length]);

  const content = useMemo(() => todoList && <>
    <div className={styles.taskCount}>
      <p className={styles.total}>{`${todoList.length} tasks`}</p>
      <p className={styles.done}>{`${completedItems.length} done`}</p>
      <p className={styles.togo}>{`${todoList.length - completedItems.length} togo`}</p>
    </div>
    <ul className={styles.list}>{list}</ul>
    <TodoInput />
  </>, [completedItems, list, todoList]);

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
      {content}
    </div>
  );
}