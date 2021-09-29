const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.screen-input');
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const positiveNegative = document.querySelector('.positive-negative')
const percent = document.querySelector('.percent')
const decimal = document.querySelector('.decimal')
let firstNumber = null;
let secondNumber = null;
let operatorMethod = null;
let operandTemp = null;
let currentOperatorMethod = null;

clear.addEventListener('click', e => {
  console.log("clicked clear.")
  display.value = null;
  firstNumber = null;
  secondNumber = null;
  operatorMethod = null;
  currentOperatorMethod = null;

  console.log("number clicked");
  console.log("firstNumber " + firstNumber);
  console.log("secondNumber " + secondNumber);
  console.log("operatorMethod " + operatorMethod);
  console.log("currentOperatorMethod " + currentOperatorMethod);
  console.log("operandTemp " + operandTemp);
});

const clickDecimal = (currentOperand, previousOperatorMethod) => {
  if(currentOperand.includes('.')) {
    return currentOperand;
  }
  else if (currentOperand === 0 || previousOperatorMethod != null) {
    return '0.';
  }
  else {
    return currentOperand + '.';
  }
}

decimal.addEventListener('click', e => {
  if(display.value.indexOf('.') === -1) {  // no decimal point in the display
    if(display.value != '') {
      display.value += decimal.innerText;
    }
    else {
      display.value = '0.';
    }
  }
});

positiveNegative.addEventListener('click', e => {
  display.value = display.value * (-1);
});

percent.addEventListener('click', e => {
  display.value = display.value / 100;
});

equal.addEventListener('click', e => {
  if(operatorMethod === null) {
    console.log('error');
  }
  else {
    if(firstNumber != null) {
      if(secondNumber === null && operandTemp === null) {
        console.log('error');
      }
      else if(secondNumber === null && operandTemp != null) {
        secondNumber = display.value;

        display.value = compute(firstNumber, operatorMethod, secondNumber);
        firstNumber = display.value;
        operatorMethod = null;
        currentOperatorMethod = null;
        secondNumber = null;
        operandTemp = null;
      }
    }
  }

  console.log("equal clicked");
  console.log("firstNumber " + firstNumber);
  console.log("secondNumber " + secondNumber);
  console.log("operatorMethod " + operatorMethod);
  console.log("currentOperatorMethod " + currentOperatorMethod);
  console.log("operandTemp " + operandTemp);
});

numberButtons.forEach(
  (number) => {
    // console.log("number clicked");
    number.addEventListener('click', () => {
      // inputString += number;
      // operatorMethod
      if(currentOperatorMethod === null) {
        if(operatorMethod != null) {
          if(secondNumber === null && operandTemp === null) {
            display.value = number.textContent;
            operandTemp = display.value;
          }
          else if(secondNumber === null && operandTemp != null) {
            display.value += number.textContent;
            operandTemp = display.value;
          }
        }
        else {
          display.value += number.textContent;
        }
      }
      else {
        if(secondNumber === null && operandTemp === null) {
          display.value = number.textContent;
          operandTemp = display.value;
        }
        else if(secondNumber === null && operandTemp != null) {
          display.value += number.textContent;
          operandTemp = display.value;
        }
      }
      
      console.log("number clicked");
      console.log("firstNumber " + firstNumber);
      console.log("secondNumber " + secondNumber);
      console.log("operatorMethod " + operatorMethod);
      console.log("currentOperatorMethod " + currentOperatorMethod);
      console.log("operandTemp " + operandTemp);
    })
  }
);

operatorButtons.forEach(
  (operator) => {
    operator.addEventListener('click', () => {
      operandTemp = null;
        if(firstNumber === null || secondNumber === null) {
          if(operatorMethod != null) {
            secondNumber = display.value;
            currentOperatorMethod = operator.innerHTML;
          }
          else {
            if(display.value != '') {
              firstNumber = display.value;
              operatorMethod = operator.innerHTML;
            }
          }
        }
  
        if(firstNumber != null && secondNumber != null) {
          display.value = compute(firstNumber, operatorMethod, secondNumber);
          firstNumber = display.value;
          operatorMethod = currentOperatorMethod;
          secondNumber = null;
        }
     
      console.log("operator clicked");
      console.log("firstNumber " + firstNumber);
      console.log("secondNumber " + secondNumber);
      console.log("operatorMethod " + operatorMethod);
      console.log("currentOperatorMethod " + currentOperatorMethod);
      console.log("operandTemp " + operandTemp);
    })
  }
);

//equal
const compute = (firstNumber, operator, secondNumber) => {
  if(operator === '+') {
    return parseFloat(firstNumber) + parseFloat(secondNumber);
  }
  else if(operator === '-') {
    return parseFloat(firstNumber) - parseFloat(secondNumber);
  }
  else if(operator === 'x') {
    return parseFloat(firstNumber) * parseFloat(secondNumber);
  }
  else if(operator === '÷') {
    return parseFloat(firstNumber) / parseFloat(secondNumber);
  }
}
