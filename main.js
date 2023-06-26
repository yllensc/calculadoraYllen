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
  if(!disabled){
  calculatorButtons.forEach((button) => {
    button.disabled = true;
  });
  powerButton.disabled = false;
  displayElement.innerHTML = '';
  calculator.clear();
}
else{
  calculatorButtons.forEach((button) => {
    button.disabled = false;
  });
}
}
// Agrega un controlador de eventos al clic del botón de encendido/apagado
powerButton.addEventListener('click', function () {
  const isCalculatorOn = this.classList.toggle('active');
debugger
  // Bloquea o desbloquea los botones de la calculadora según el estado
  toggleButtonsDisabled(isCalculatorOn);
});

// Inicializa el estado de encendido/apagado al cargar la página
powerButton.classList.add('active');
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
