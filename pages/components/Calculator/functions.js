import math from 'mathjs';

export const calculate = (eq) => math.evaluate(trimLastOperand(eq).replace(" ", "").replace("x", "*")).toString();

export const findIndexOfLastOperand = (eq) => {
    // Return the index of the last ops in the input equation
    // -1 is returned if there's no ops
    let i;
    for (i = eq.length-1; i >= 0; i--) {
      if (['/', 'x', '-', '+'].indexOf(eq[i]) >= 0 && eq[i+1] === " ") break;
    }
    return i;
  }

  export const trimLastOperand = (eq) => {
    if (findIndexOfLastOperand === eq.length-2) eq = eq.substring(0, eq.length-3);
    return eq;
  }

  export const findIndexOfLastNumber = (eq) => {
    // Return the starting index of the last number in the input equation
    const lastOpsIndex = findIndexOfLastOperand(trimLastOperand(eq));
    if (lastOpsIndex < 0) return 0;
    return lastOpsIndex + 2;
  }

  export const findLastCalculation = (eq) => {
    // Return part of the equation that needed to be calculated first
    let i;
    for (i = eq.length-1; i >= 0; i--) {
      if (['-', '+'].indexOf(eq[i]) >= 0 && eq[i+1] === " ") break;
    }
    return eq.substring(i+2);
  }