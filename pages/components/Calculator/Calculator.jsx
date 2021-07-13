import React from 'react';
import styles from './calculator.module.scss';
import DigitButton from './DigitButton';

export default function Calculator() {
  return (
    <main className={styles.main}>
        <div className={styles.display}>
            <h5>Equations</h5>
            <h3>Result</h3>
        </div>
        <div className={styles.buttons}>
            <div className={styles.digits}>

            </div>
            <div className={styles.operands}>

            </div>
        </div>
    </main>
  );
}
