import { useMemo, useCallback } from 'react';
import _ from 'lodash';
import styles from './calculator.module.scss';

export default function Calculator() {
  const handleNumber = (num) => {
    console.log("number", num);
  };

  const handleOperands = (ops) => {
    console.log("operands", ops);
  };

  const handleClick = useCallback(
    (e) => {
      console.log(e.target.tagName);
      const val = e.target.value;
      if (e.target.tagName !== 'BUTTON' || typeof val !== "string") return;
      if (_.range(1,10).indexOf(parseInt(val)) >= 0) handleNumber(val);
      else handleOperands(val);
    }, []
  );

  const createDigits = () => _.range(1,10).map((num) => (
      <button key={`D-${num}`} value={num}>{num}</button>
  ));
  const createOperands = () => ['/', 'x', '-', '+', '='].map((ops) => (
    <button key={`OPS-${ops}`} value={ops}>{ops}</button>
  ));
  const createSecondaryOperands = () => ['C', '±', '%'].map((ops) => (
    <button key={`OPS-${ops}`} value={ops}>{ops}</button>
  ));
  
  const digits = useMemo(() => createDigits(), []);
  const operands = useMemo(() => createOperands(), []);
  const secondaryOperands = useMemo(() => createSecondaryOperands(), []);

  return (
    <main className={styles.main}>
        <div className={styles.display}>
            <h5>Equations</h5>
            <h1>Result</h1>
        </div>
        <div className={styles.buttons}>
            <div className={styles.digits} onClick={handleClick}>
              {secondaryOperands}
              {digits}
              <button value={0} className={styles.zero}>0</button>
              <button value=".">.</button>
            </div>
            <div className={styles.operands}>
              {operands}
            </div>
        </div>
    </main>
  );
}
