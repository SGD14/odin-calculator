let storedValue = undefined;
let currentValue = "";
let storedOperator = '';

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch(operator) {
        case '+': return add(x, y);
        case '-': return subtract(x, y);
        case '*': return multiply(x, y);
        case '/': return divide(x, y);
    }

    return 0;
}

function display(string) {
    document.querySelector("#screen").textContent = string;
}

function onNumberClick(number) {
    if(!Number.parseFloat(currentValue) || !Number.isFinite(Number.parseFloat(currentValue))) {
        currentValue = "" + number;
    } else {
        if(currentValue.includes('.') && currentValue.indexOf('.') < currentValue.length - 2)
            return;

        currentValue = "" + currentValue + number;
    }
    
    display(currentValue)
}

function onDotClick() {
    if(currentValue.includes('.'))
        return;

    if(!Number.parseFloat(currentValue) || !Number.isFinite(Number.parseFloat(currentValue)))
        currentValue = "0";

    currentValue += ".";

    display(currentValue);
}

function onOperatorClick(operator) {
    if(!currentValue)
        return;

    if(storedValue !== undefined && storedOperator) {
        storedValue = Math.round(operate(storedOperator, storedValue, Number.parseFloat(currentValue)) * 100) / 100;
        storedOperator = operator;
        currentValue = "";
        display(storedValue);
    } else if(storedValue !== undefined && !storedOperator) {
        storedOperator = operator;
    } else if(storedValue === undefined) {
        storedValue = Number.parseFloat(currentValue);
        storedOperator = operator;
        currentValue = "";
    }
}

function onEqualClick() {
    if(storedValue === undefined || !storedOperator || !currentValue)
        return;

    let result = Math.round(operate(storedOperator, storedValue, Number.parseFloat(currentValue)) * 100) / 100;

    storedOperator = "";
    storedValue = undefined;
    currentValue = "" + result;

    display(currentValue);
}

function onClearClick() {
    storedValue = undefined;
    storedOperator = "";
    currentValue = "";
    display("");
}

function onDelClick() {
    if(!currentValue || !Number.isFinite(Number.parseFloat(currentValue))) {
        display("");
        return;
    }

    if(currentValue.length > 1) {
        currentValue = currentValue.substring(0, currentValue.length - 1);
        display(currentValue);
    } else {
        currentValue = "";
        display("");
    }
}

document.querySelectorAll(".number").forEach(element => element.addEventListener('click', () => onNumberClick(element.textContent)));
document.querySelectorAll(".operator").forEach(element => element.addEventListener('click', () => onOperatorClick(element.textContent)));
document.querySelector("#equal-button").addEventListener('click', () => onEqualClick());
document.querySelector("#clear-button").addEventListener('click', () => onClearClick());
document.querySelector("#del-button").addEventListener('click', () => onDelClick());
document.querySelector("#dot-button").addEventListener('click', () => onDotClick());

document.addEventListener('keydown', (e) => {
    if(Number.isFinite(Number.parseFloat(e.key))) {
        onNumberClick(e.key);
        return;
    }

    switch(e.key) {
        case '/': onOperatorClick('/'); break;
        case '*': onOperatorClick('*'); break;
        case '-': onOperatorClick('-'); break;
        case '+': onOperatorClick('+'); break;
        case 'Enter': onEqualClick(); break;
        case '.': onDotClick(); break;
        case 'Backspace': onDelClick(); break;
        case 'Escape': onClearClick(); break;
    }
});