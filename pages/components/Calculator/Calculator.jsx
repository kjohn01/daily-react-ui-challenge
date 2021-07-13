import { useMemo } from 'react';
import _ from 'lodash';
import styles from './calculator.module.scss';

export default function Calculator() {
  const createDigits = () => _.range(1,10).map((num, i) => (
      <button key={`D-${num}`} value={num} onClick={() => console.log(num)}>{num}</button>
    ));
  const Digits = useMemo(() => createDigits(), []);

  return (
    <main className={styles.main}>
        <div className={styles.display}>
            <h5>Equations</h5>
            <h1>Result</h1>
        </div>
        <div className={styles.buttons}>
            <div className={styles.digits}>
              <button value="C" className={styles.secondaryOperands} onClick={() => console.log("C")}>C</button>
              <button value="±" className={styles.secondaryOperands} onClick={() => console.log("±")}>±</button>
              <button value="%" className={styles.secondaryOperands} onClick={() => console.log("%")}>%</button>
              {Digits}
              <button value={0} onClick={() => console.log(0)} className={styles.zero}>0</button>
              <button value="." onClick={() => console.log(".")}>.</button>
            </div>
            <div className={styles.operands}>
              <button value="/" onClick={() => console.log("/")}>/</button>
              <button value="x" onClick={() => console.log("x")}>x</button>
              <button value="-" onClick={() => console.log("-")}>-</button>
              <button value="+" onClick={() => console.log("+")}>+</button>
              <button value="=" onClick={() => console.log("=")}>=</button>
            </div>
        </div>
    </main>
  );
}
