let currentDisplayValue = "";
let storedValue = undefined;
let currentValue = undefined;
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

function updateDisplay() {
    document.querySelector("#screen").textContent = currentDisplayValue;
}

function onNumberClick(number) {
    if(currentValue === undefined)
        currentDisplayValue = "";

    currentDisplayValue += number;
    currentValue = parseInt(currentDisplayValue);
    updateDisplay();
}

function onOperatorClick(operator) {
    if(storedValue !== undefined && storedOperator && currentValue === undefined){
        storedOperator = operator;
        return;
    }

    if(storedOperator && storedValue && currentValue) {
        storedValue = operate(storedOperator, storedValue, currentValue);
    } else {
        storedValue = currentValue;
    }
    
    storedOperator = operator;
    currentValue = undefined;
    currentDisplayValue = "" + storedValue;
    updateDisplay();
}

function onEqualClick() {
    if(storedValue === undefined || !storedOperator || currentValue === undefined)
        return;

    let result = operate(storedOperator, storedValue, parseInt(currentDisplayValue));

    storedOperator = "";
    storedValue = undefined;
    currentValue = result;

    currentDisplayValue = result;
    updateDisplay();
}

function onClearClick() {
    storedValue = undefined;
    storedOperator = "";
    currentValue = undefined;
    currentDisplayValue = "";
    updateDisplay();
}

function onDelClick() {
    if(currentDisplayValue) {
        currentDisplayValue = currentDisplayValue.substring(0, currentDisplayValue.length - 1);
        
        if(currentDisplayValue)
            currentValue = parseInt(currentDisplayValue);
        else
            currentValue = undefined;

        updateDisplay();
    }
}

document.querySelectorAll(".number").forEach(element => element.addEventListener('click', () => onNumberClick(element.textContent)));
document.querySelectorAll(".operator").forEach(element => element.addEventListener('click', () => onOperatorClick(element.textContent)));
document.querySelector("#equal-button").addEventListener('click', () => onEqualClick());
document.querySelector("#clear-button").addEventListener('click', () => onClearClick());
document.querySelector("#del-button").addEventListener('click', () => onDelClick());