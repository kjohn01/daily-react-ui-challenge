import React from 'react';
import BackButton from '../components/BackButton/BackButton';
import Footer from '../components/Footer/Footer';
import TodoList from '../components/TodoList/containers/TodoList';
import { TodoListProvider } from '../components/TodoList/todoList-context';
import styles from './todoListPage.module.scss';

const TodoListPage = () => {
    return (
      <TodoListProvider> 
        <div className={styles.root}>
          <BackButton />
          <TodoList />
          <Footer 
            text="Design inspired by"
            link="https://dribbble.com/shots/3967195-ToDo-Task-List" author="Vishnu Prasad" 
          />
        </div>
      </TodoListProvider>
    )
}

export default TodoListPage;