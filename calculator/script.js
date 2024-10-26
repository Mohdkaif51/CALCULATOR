let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const screen = document.querySelector('.calculator-screen');

function updateScreen() {
  screen.value = currentInput;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? digit : currentInput + digit;
  }
}

function handleOperator(nextOperator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    const result = calculate(firstOperand, operator, parseFloat(currentInput));
    currentInput = `${parseFloat(result.toFixed(5))}`;
    firstOperand = result;
  }
  operator = nextOperator;
  waitingForSecondOperand = true;
}

function handleEqual() {
  if (operator && firstOperand !== null) {
    const result = calculate(firstOperand, operator, parseFloat(currentInput));
    currentInput = `${parseFloat(result.toFixed(5))}`;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
  }
}

function calculate(firstOperand, operator, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

function resetCalculator() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateScreen();
}

const keys = document.querySelectorAll('.key');

keys.forEach(key => {
  key.addEventListener('click', function () {
    const value = this.value;

    if (value === 'clear') {
      resetCalculator();
    } else if (value === '=') {
      handleEqual();
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else {
      inputDigit(value);
    }
    updateScreen();
  });
});
