const input = document.getElementById('inputtext');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let resultDisplayed = false;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        
        if (value === 'C') {
            clearInput();
        } else if (value === 'DEL') {
            deleteLastCharacter();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else if (value === '.') {
            handleDecimal();
        } else {
            appendNumber(value);
        }
    });
});

function clearInput() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    input.value = '0';
    resultDisplayed = false;
}

function deleteLastCharacter() {
    currentInput = currentInput.slice(0, -1);
    input.value = currentInput || '0';
}

function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = number;
        resultDisplayed = false;
    } else {
        currentInput += number;
    }
    input.value = currentInput;
}

function handleOperator(newOperator) {
    if (firstOperand === '') {
        firstOperand = currentInput;
    } else if (secondOperand === '') {
        secondOperand = currentInput;
        firstOperand = calculate(firstOperand, secondOperand, operator);
        input.value = firstOperand;
    }
    operator = newOperator;
    currentInput = '';
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    input.value = currentInput;
}

function calculateResult() {
    if (operator && firstOperand && currentInput !== '') {
        secondOperand = currentInput;
        const result = calculate(firstOperand, secondOperand, operator);
        input.value = result;
        currentInput = result;
        resultDisplayed = true;
        firstOperand = '';
        secondOperand = '';
        operator = '';
    }
}

function calculate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return second;
    }
}
