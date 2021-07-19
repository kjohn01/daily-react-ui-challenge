import React, { useMemo, useCallback, useState } from 'react';
import _ from 'lodash';
import styles from './calculator.module.scss';
import { calculate, findIndexOfLastOperand, trimLastOperand, findLastCalculation, findLastNumber } from './functions';

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("0");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const toggleNegativity = () => {
    // Analyse the equation and add the "-" sign to the appropriate place
    // Adjust the display
  }

  const percentage = () => {
    // turn the current display value into %
    // find the last number in the equation and replace it with the current display
    // const result = (Number(display) / 100).toString();
    // const lastOpsIndex = findIndexOfLastOperand();
    // if (lastOpsIndex > 0) setEquation(equation.substring(0, lastOpsIndex+2) + result);
    // else setEquation(result);
    // setDisplay(result);
  }

  const handleNumber = useCallback((num) => {
    if (isNewNumber || equation[equation.length-2] === "=") {
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
  }, [display, equation, isNewNumber])

  const handleOperands = useCallback((ops) => {
    // console.log("operands", ops);
    // Consecutive operands = overwriting
    // Divided by 0 = 0
    let eq = equation;
    let lastOpsIndex;
    switch (ops) {
      case "/":
      case "x":
        eq = trimLastOperand(eq);
        lastOpsIndex = findIndexOfLastOperand(eq);
        // partial calculate
        if (lastOpsIndex !== -1 && ["x", "/"].indexOf(eq[lastOpsIndex]) >= 0) setDisplay(calculate(findLastCalculation(eq)));
        setEquation(`${eq} ${ops} `);
        setIsNewNumber(false);
        break;
      
      case "-":
      case "+":
        eq = trimLastOperand(eq);
        if (findIndexOfLastOperand(eq) !== -1) setDisplay(calculate(eq));
        setEquation(`${eq} ${ops} `);
        setIsNewNumber(false);
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
        eq = trimLastOperand(eq);
        // if followed by an operand, add "0."
        if (eq != equation) {
          setDisplay("0.");
          setEquation(equation + "0.");
        }
        else if (Number.isInteger(findLastNumber(eq)[1])) {
          setDisplay(display + ".");
          setEquation(equation + ".");
        }
        // if the current number is already a float, does nothing
        setIsNewNumber(false);
        break;

      case "=":
        eq = trimLastOperand(eq);
        setEquation(eq + " = ");
        setDisplay(calculate(eq));
        setIsNewNumber(false);
        break;
    
      default:
        break;
    }
  }, [equation]);

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
