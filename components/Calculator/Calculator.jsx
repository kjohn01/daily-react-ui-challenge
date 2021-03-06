import React, { useMemo, useCallback, useState } from 'react';
import _ from 'lodash';
import styles from './calculator.module.scss';
import { calculate, findIndexOfLastOperand, trimLastOperand, findLastCalculation, findLastNumber, isDigit } from './functions';

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("0");

  const toggleNegativity = useCallback((eq) => {
    // Analyse the equation and add the "-" sign to the appropriate place
    if (eq != equation) {
      // if followed by an operand, add "-0"
      setDisplay("-0");
      if (equation[equation.length-2] === "=") setEquation("-0");
      else setEquation(equation + "-0");
      return;
    }
    // Handle display & equation
    let absStr = Math.abs(Number(display)).toString();
    let base = eq.substring(0, findLastNumber(eq)[0]);
    if (display.startsWith("-")) {
      setDisplay(absStr);
      setEquation(base + absStr);
    }
    else {
      setDisplay(`-${absStr}`);
      setEquation(`${base}-${absStr}`);
    }
  }, [display, equation]);

  const percentage = useCallback(() => {
    // turn the current display value into %
    // find the last number in the equation and replace it with the current display
    const result = (Number(display) / 100).toString();
    if (equation[equation.length-2] === "=") setEquation(result);
    else setEquation(equation.substring(0, findLastNumber(equation)[0]) + result);
    setDisplay(result);
  }, [display, equation]);

  const handleNumber = useCallback((num) => {
    if (equation === "0" || equation[equation.length-2] === "=") {
      setDisplay(num);
      setEquation(num);
    }
    else if (equation != trimLastOperand(equation)) {
      setDisplay(num);
      setEquation(equation + num);
    }
    else if (display === "0") {
      setDisplay(num);
      // user tapped 0
      if (equation[equation.length-1] === "0") setEquation(equation.slice(0, equation.length-1) + num);
      // current result is 0
      else setEquation(equation + num);
    }
    else if (display === "-0") {
      setDisplay(`-${num}`);
      setEquation(equation.slice(0, equation.length-1) + num);
    }
    else {
      setDisplay(display + num);
      setEquation(equation + num);
    }
  }, [display, equation])

  const handleOperands = useCallback((ops) => {
    // Consecutive operands = overwriting
    // Divided by 0 = 0
    const eq = trimLastOperand(equation);
    const lastOpsIndex = findIndexOfLastOperand(eq);
    switch (ops) {
      case "/":
      case "x":
        if (equation[equation.length-2] === "=") {
          setEquation(`${display} ${ops} `);
          break;
        }
        // partial calculate
        if (lastOpsIndex !== -1 && ["x", "/"].indexOf(eq[lastOpsIndex]) >= 0) setDisplay(calculate(findLastCalculation(eq)));
        setEquation(`${eq} ${ops} `);
        break;
      
      case "-":
      case "+":
        if (equation[equation.length-2] === "=") {
          setEquation(`${display} ${ops} `);
          break;
        }
        if (lastOpsIndex !== -1) setDisplay(calculate(eq));
        setEquation(`${eq} ${ops} `);
        break;
  
      case "C":
        // Reset states
        setDisplay("0");
        setEquation("0");
        break;
        
      case "??":
        toggleNegativity(eq);
        break;

      case "%":
        if ((!isDigit(parseInt(equation[equation.length-1])) && equation[equation.length-2] !== "=")) break;
        percentage();
        break;
      
      case ".":
        if (eq != equation) {
          // if followed by an operand, add "0."
          setDisplay("0.");
          if (equation[equation.length-2] === "=") setEquation("0.");
          else setEquation(equation + "0.");
        }
        else if (isDigit(parseInt(equation[equation.length-1])) && Number.isInteger(findLastNumber(eq)[1])) {
          setDisplay(display + ".");
          setEquation(equation + ".");
        }
        // if the current number is already a float, does nothing
        break;

      case "=":
        setEquation(eq + " = ");
        setDisplay(calculate(eq));
        break;
    
      default:
        break;
    }
  }, [display, equation, percentage, toggleNegativity]);

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
  const createSecondaryOperands = () => ['C', '??', '%'].map((ops) => (
    <button key={`OPS-${ops}`} value={ops} className={styles.secondaryOperands}>{ops}</button>
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
