import math from 'mathjs';
import _ from 'lodash';

export const isDigit = (num) => _.range(10).indexOf(num) >= 0 

export const calculate = (eq) => math.evaluate(trimLastOperand(eq).replace(" ", "").replace("x", "*")).toString();

export const findIndexOfLastOperand = (eq) => {
    // Return the index of the last ops in the input equation
    // -1 is returned if there's no ops
    let i;
    for (i = eq.length-1; i >= 0; i--) {
      if (['/', 'x', '-', '+', '='].indexOf(eq[i]) >= 0 && eq[i+1] === " ") break;
    }
    return i;
  }

  export const trimLastOperand = (eq) => {
    const lastOpsIndex = findIndexOfLastOperand(eq);
    if (lastOpsIndex !== -1 && lastOpsIndex === eq.length-2) eq = eq.substring(0, eq.length-3);
    return eq;
  }

  export const findLastNumber = (eq) => {
    // Return the starting index and value of the last number in the input equation
    // [index, value, negativity]
    // Negativity will be true when the last number is negative, including -0
    eq = trimLastOperand(eq);
    const lastOpsIndex = findIndexOfLastOperand(eq);
    let i;
    if (lastOpsIndex < 0) i = 0;
    else i = lastOpsIndex + 2;
    const s = eq.substring(i);
    return [i, Number(s), s[0] === "-"];
  }

  export const findLastCalculation = (eq) => {
    // Return part of the equation that needed to be calculated first
    let i;
    for (i = eq.length-1; i >= 0; i--) {
      if (['-', '+'].indexOf(eq[i]) >= 0 && eq[i+1] === " ") break;
    }
    return eq.substring(i+2);
  }