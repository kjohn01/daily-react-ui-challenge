import { useMemo, useCallback, useState } from 'react';
import _ from 'lodash';
import styles from './calculator.module.scss';

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("0");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (isNewNumber || equation[equation.length-1] === "=") {
      setDisplay(num);
      setEquation(num);
    }
    else if (display === "0") {
      setDisplay(num);
      // user tapped 0
      if (equation[equation.length-1] === "0") setEquation(equation.slice(0, equation.length-1)+num);
      // current result is 0
      else setEquation(equation+num);
    }
    else {
      setDisplay(display+num);
      setEquation(equation+num);
    }
    setIsNewNumber(false);
  };

  const handleOperands = (ops) => {
    // console.log("operands", ops);
    // Consective operands = overwriting
    // Divided by 0 = 0

    switch (ops) {
      case "/":
        // partial calculate
        setDisplay(calculate(equation))
        break;

      case "x":
        // partial calculate
        break;
      
      case "-":
        
        break;
      case "+":
        
        break;
  
      case "C":
        // Reset states
        setDisplay("0");
        setEquation("0");
        setIsNewNumber(true);
        break;
        
      case "±":
        toggleNegativity();
        break;

      case "%":
        percentage();
        break;
      
      case ".":
        // if followed by an operand, add "0."
        // if the current number is already a float, does nothing
        break;

      case "=":
        setDisplay(calculate(equation));
        break;
    
      default:
        break;
    }
    setIsNewNumber(false);
  };

  const calculate = (eq) => {
    // return the calculated value;
    // Note that eq may not be the complete equation
    eq = eq.replace(" ", "");
  }

  const toggleNegativity = () => {
    // Analyse the equation and add the "-" sign to the appropriate place
    // Adjust the display
  }

  const percentage = () => {
    // turn the current display value into %
    // find the last number in the equation and replace it with the current display
    const result = (Number(display) / 100).toString();
    const lastOpsIndex = findIndexOfLastOps();
    if (lastOpsIndex > 0) setEquation(equation.substring(0, lastOpsIndex+2) + result);
    else setEquation(result);
    setDisplay(result);
  }

  const findIndexOfLastOps = () => {
    // return the index of the last ops in the equation
    // -1 is returned if there's no ops
    let i;
    for (i = equation.length-1; i <= 0; i--) {
      if (['/', 'x', '-', '+'].indexOf(equation[i]) >= 0 && equation[i+1] === " ") break;
    }
    return i;
  }

  const handleClick = useCallback(
    (e) => {
      // console.log(e.target.tagName);
      const val = e.target.value;
      if (e.target.tagName !== 'BUTTON' || typeof val !== "string") return;
      if (_.range(0,10).indexOf(parseInt(val)) >= 0) handleNumber(val);
      else handleOperands(val);
    }, [handleOperands, handleNumber]
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
            <h5 className={styles.equation}>{equation}</h5>
            <h1 className={styles.result}>{display}</h1>
        </div>
        <div className={styles.buttons} onClick={handleClick}>
            <div className={styles.digits}>
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
