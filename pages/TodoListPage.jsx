import React from 'react';
import BackButton from '../components/BackButton/BackButton';
import Footer from '../components/Footer/Footer';
import TodoList from '../components/TodoList/TodoList';
import styles from './todoListPage.module.scss';

const SignUpPage = () => {
    return (
      <div className={styles.root}> 
        <BackButton />
        <TodoList />
        <Footer link="https://dribbble.com/shots/3967195-ToDo-Task-List" author="Vishnu Prasad" />
      </div>
    )
}
export default SignUpPage;