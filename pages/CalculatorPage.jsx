import React from 'react';
import Calculator from '../components/Calculator/Calculator';
import BackButton from '../components/BackButton/BackButton';
import Footer from '../components/Footer/Footer';
import styles from './calculatorPage.module.scss';

const CalculatorPage = () => {
    return (
        <div className={styles.root}> 
          <BackButton />
          <Calculator />
          <Footer link="https://dribbble.com/shots/2377589-Calculator-Why-not/attachments/2377589-Calculator-Why-not?mode=media" author="Denis Abdullin" />
        </div>
    )
}
export default CalculatorPage;