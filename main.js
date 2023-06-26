//document.addEventListener('DOMContentLoaded', function() {
//    const display = document.querySelector('.calculator__display');
//    const keys = document.querySelector('.calculator__keys');
//  
//    let firstOperand = '';
//    let operator = '';
//    let secondOperand = '';
//    let isCalculatorOn = false;
//  
//    keys.addEventListener('click', function(event) {
//        if (event.target.matches('button')) {
//          const key = event.target;
//          const keyContent = key.textContent;
//    
//          if (keyContent === 'AC') {
//            clearCalculator();
//          } else if (keyContent === '=') {
//            if (hasEnoughOperands()) {
//              const result = calculateResult();
//              display.textContent = result;
//              setOperands(result, '', '');
//            }
//          } else if (isOperator(keyContent)) {
//            if (canSetOperator()) {
//              operator = keyContent;
//              display.textContent += operator;
//            }
//          } else if (keyContent === 'on') {
//            isCalculatorOn = true;
//          } else if (keyContent === 'off') {
//            isCalculatorOn = false;
//          } else {
//            appendNumber(keyContent);
//          }
//        }
//      });
//    
//  
//    function clearCalculator() {
//      display.textContent = '0';
//      setOperands('', '', '');
//    }
//  
//    function hasEnoughOperands() {
//      return firstOperand !== '' && operator !== '' && secondOperand !== '';
//    }
//  
//    function calculateResult() {
//      const num1 = parseFloat(firstOperand);
//      const num2 = parseFloat(secondOperand);
//  
//      switch (operator) {
//        case '+':
//          return num1 + num2;
//        case '-':
//          return num1 - num2;
//        case 'x':
//          return num1 * num2;
//        case '÷':
//            if (num1/num2 == NaN){
//                return "ERROR";
//            }
//          return num1 / num2;
//        default:
//          return '';
//      }
//    }
//  
//    function isOperator(keyContent) {
//      return ['+', '-', 'x', '÷'].includes(keyContent);
//    }
//  
//    function canSetOperator() {
//      return firstOperand !== '' && operator === '' && secondOperand === '';
//    }
//  
//    function appendNumber(keyContent) {
//      if (operator === '') {
//        firstOperand += keyContent;
//      } else {
//        secondOperand += keyContent;
//      }
//      display.textContent += keyContent;
//    }
//  
//    function setOperands(first, op, second) {
//      firstOperand = first;
//      operator = op;
//      secondOperand = second;
//    }
//  
//    // Event listener para el botón "on"
//    const onButton = document.querySelector('.key--on');
//    onButton.addEventListener('click', function() {
//      isCalculatorOn = true;
//    });
//  
//    // Event listener para el botón "off"
//    const offButton = document.querySelector('.key--off');
//    offButton.addEventListener('click', function() {
//      isCalculatorOn = false;
//      clearCalculator();
//    });
//  });

class Calculator {
  constructor() {
    this.displayValue = '0';
  }

  clear() {
    this.displayValue = '0';
  }

  evaluate(expression) {
    try {
      const result = eval(expression);
      this.displayValue = result.toString();
    } catch (error) {
      this.displayValue = 'Error';
    }
  }

  getNumberClick(number) {
    if (this.displayValue === '0') {
      this.displayValue = number.toString();
    } else {
      this.displayValue += number.toString();
    }
  }

  getOperatorClick(operator) {
    this.displayValue += operator;
  }

  checkParenthesisClick(parenthesis) {
    if (parenthesis === '(') {
      this.displayValue += parenthesis;
      this.parenthesisCount++;
    } else if (parenthesis === ')') {
      if (this.parenthesisCount < 1) {
        this.displayValue = 'Error: Parenthesis mismatch';
      } else {
        this.displayValue += parenthesis;
        this.parenthesisCount--;
      }
    }
  }
  

  getEqualClick() {
    this.evaluate(this.displayValue);
  }

  getBackspaceClick() {
    if (this.displayValue.length === 1) {
      this.displayValue = '0';
    } else {
      this.displayValue = this.displayValue.slice(0, -1);
    }
  }

}
const calculator = new Calculator();

// Obtener referencias a los elementos HTML
const displayElement = document.querySelector('.calculator__display');
const numberButtons = document.querySelectorAll('.key--number');
const operatorButtons = document.querySelectorAll('.key--operatorAdd, .key--operatorSub, .key--operatorMul, .key--operatorDiv');
const parenthesisButtons = document.querySelectorAll('.key--parenthesis');
const equalButton = document.querySelector('.key--equal');
const clearButton = document.querySelector('[data-action="clear"]');
// Obtener referencia al botón de borrado de caracteres
const backspaceButton = document.querySelector('.key--backspace');
// Obtén una referencia al botón de encendido/apagado
const powerButton = document.querySelector('#power-button');

// Obtén una lista de todos los botones de la calculadora
const calculatorButtons = document.querySelectorAll('.calculator__keys button');

// Define una función para bloquear o desbloquear los botones
function toggleButtonsDisabled(disabled) {
  calculatorButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

// Agrega un controlador de eventos al clic del botón de encendido/apagado
powerButton.addEventListener('click', function () {
  const isCalculatorOn = this.classList.toggle('active');

  // Bloquea o desbloquea los botones de la calculadora según el estado
  toggleButtonsDisabled(!isCalculatorOn);
});

// Inicializa el estado de encendido/apagado al cargar la página
powerButton.classList.add('active');
toggleButtonsDisabled(false);



// Escuchar evento de clic en el botón de borrado de caracteres
backspaceButton.addEventListener('click', () => {
  calculator.getBackspaceClick();
  displayElement.textContent = calculator.displayValue;
});

// Escuchar eventos de clic en los botones de números
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.textContent;
    calculator.getNumberClick(number);
    displayElement.textContent = calculator.displayValue;
  });
});

// Escuchar eventos de clic en los botones de operadores
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.textContent;
    calculator.getOperatorClick(operator);
    displayElement.textContent = calculator.displayValue;
  });
});

// Escuchar eventos de clic en los botones de paréntesis
parenthesisButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const parenthesis = button.textContent;
    calculator.checkParenthesisClick(parenthesis);
    displayElement.textContent = calculator.displayValue;
  });
});


// Escuchar evento de clic en el botón igual
equalButton.addEventListener('click', () => {
  calculator.getEqualClick();
  displayElement.textContent = calculator.displayValue;
});

// Escuchar evento de clic en el botón clear
clearButton.addEventListener('click', () => {
  calculator.clear();
  displayElement.textContent = calculator.displayValue;
});
