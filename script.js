const input = document.getElementById('inputtext');
const buttons = document.querySelectorAll('button');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (btn.classList.contains('number') || btn.classList.contains('operator') || btn.classList.contains('decimal')) {
            input.value += value;
        } else if (btn.classList.contains('clear')) {
            input.value = '';
        } else if (btn.classList.contains('delete')) {
            input.value = input.value.slice(0, -1);
        } else if (btn.classList.contains('equals')) {
            try {
                const result = evaluateExpression(input.value);
                input.value = result;
            } catch (err) {
                input.value = 'Error';
            }
        } else if (btn.classList.contains('function')) {
            applyFunction(value);
        }
    });
});

function applyFunction(func) {
    let current = input.value;

    try {
        let result;

        switch (func) {
            case 'sin':
                result = Math.sin(toRadians(eval(current)));
                break;
            case 'cos':
                result = Math.cos(toRadians(eval(current)));
                break;
            case 'tan':
                result = Math.tan(toRadians(eval(current)));
                break;
            case '√':
                result = Math.sqrt(eval(current));
                break;
            case '^':
                input.value += '**';
                return;
            case 'log':
                result = Math.log10(eval(current));
                break;
            case 'ln':
                result = Math.log(eval(current));
                break;
            case 'π':
                input.value += Math.PI;
                return;
            case 'e':
                input.value += Math.E;
                return;
            case '!':
                result = factorial(eval(current));
                break;
            default:
                result = current;
        }

        input.value = result;
    } catch (error) {
        input.value = 'Error';
    }
}

function evaluateExpression(expr) {
    // Replace 'x' with '*' for multiplication
    expr = expr.replace(/x/g, '*');
    return Function('"use strict";return (' + expr + ')')();
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
