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

function display(string) {
    document.querySelector("#screen").textContent = string;
}

function onNumberClick(number) {
    if(!currentValue)
        currentValue = Number.parseFloat(number);
    else
        currentValue = Number.parseFloat("" + currentValue + number);
    
    display(currentValue)
}

function onOperatorClick(operator) {
    if(currentValue === undefined)
        return;

    if(storedValue !== undefined && storedOperator) {
        storedValue = operate(storedOperator, storedValue, currentValue);
        storedOperator = operator;
        currentValue = undefined;
        display(storedValue);
    } else if(storedValue !== undefined && !storedOperator) {
        storedOperator = operator;
    } else if(storedValue === undefined) {
        storedValue = currentValue;
        storedOperator = operator;
        currentValue = undefined;
    }
}

function onEqualClick() {
    if(storedValue === undefined || !storedOperator || currentValue === undefined)
        return;

    let result = operate(storedOperator, storedValue, currentValue);

    storedOperator = "";
    storedValue = undefined;
    currentValue = result;

    display(currentValue);
}

function onClearClick() {
    storedValue = undefined;
    storedOperator = "";
    currentValue = undefined;
    display();
}

function onDelClick() {
    if(currentValue === undefined) {
        display("");
        return;
    }

    let currentValueString = currentValue.toString();

    if(currentValueString.length > 1) {
        currentValue = Number.parseFloat(currentValueString.substring(0, currentValueString.length - 1));
        display("" + currentValue);
    } else {
        currentValue = undefined;
        display("");
    }
}

document.querySelectorAll(".number").forEach(element => element.addEventListener('click', () => onNumberClick(element.textContent)));
document.querySelectorAll(".operator").forEach(element => element.addEventListener('click', () => onOperatorClick(element.textContent)));
document.querySelector("#equal-button").addEventListener('click', () => onEqualClick());
document.querySelector("#clear-button").addEventListener('click', () => onClearClick());
document.querySelector("#del-button").addEventListener('click', () => onDelClick());