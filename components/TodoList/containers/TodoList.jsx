import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { actions, useTodo } from '../todoList-context';
import TodoItem from './TodoItem';
import TodoInput from '../components/TodoInput';
import { connectToDatabase, fetchTodoItems } from '../database';
import styles from '../styles/todoList.module.scss';

export async function getServerSideProps() {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
export default function TodoList({ isConnected }) {
  const { state: {todoList}, dispatch } = useTodo();
  const completedItems = useMemo(() => todoList.filter((todoItem) => todoItem.isCompleted === true), [todoList]);

  useEffect(() => {
    console.log(isConnected);
    // if (isConnected) {
    //   dispatch({ 
    //     type: actions.OVERWRITE_TODO_ITEMS, 
    //     todoList: fetchTodoItems()
    //   });
    // }
  }, [dispatch, isConnected]);
  
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

TodoList.propTypes= {
  isConnected: PropTypes.bool
};