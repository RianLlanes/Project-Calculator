const display = document.querySelector('.display');
const result = document.querySelector('.result');

const numberButtons = document.querySelectorAll('.numberLayout button');
const operatorButtons = document.querySelectorAll('.equations button');

const backspaceButton = document.querySelector('.backspace');
const clearButton = document.querySelector('.clear');
const parenthesisButton = document.querySelector('.parenthesis');
const moduloButton = document.querySelector('.modulo');
const plusMinusButton = document.querySelector('.plusMinus');
const dotButton = document.querySelector('.dot');
const equalsButton = document.querySelector('.equals');

// Create variables for operations
let firstNum = '';
let operator = '';
let secondNum = '';


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Err' : (a / b);

const hasDecimal = (num) => num.includes('.');
const plusMinus = (num) => -(num);

// function hasDecimal(num){
//     return num.includes('.');
// }

// function plusMinus(num){
//     return -(num);
// }

const clearDisplay = () => {
    display.textContent = '0';
    result.textContent = '0';
};

const updateDisplay = (value) => {
    display.textContent = value;
    result.textContent = value;
    
};

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return (num2 === 0) ? 'Err: Division by zero' : divide(num1, num2);;
        default:
            return 'Err: Invalid operator';
    }
};

// Clear Button Functionality
clearButton.addEventListener('click', () => {
    clearDisplay();
    firstNum = '';
    operator = '';
    secondNum = '';
});

// Implement Number Button Click Functionality
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button !== clearButton && button !== parenthesisButton &&
            button !== moduloButton && button !== plusMinusButton) {
            if (operator === '') {
                // Check if the button clicked is a dot and if there's already a dot in firstNum
                if (button === dotButton && hasDecimal(firstNum)) {
                    return; // Do nothing if there's already a dot in firstNum
                } 
                // Append the button's content to firstNum
                firstNum += button.textContent;
                updateDisplay(firstNum);
                
            } else {
                // Check if the button clicked is a dot and if there's already a dot in firstNum
                if (button === dotButton && hasDecimal(secondNum)) {
                    return; // Do nothing if there's already a dot in firstNum
                }
                // Append the button's content to firstNum
                secondNum += button.textContent;
                updateDisplay(secondNum);
            }
        }
    });
});

plusMinusButton.addEventListener('click', () => {
    // Call the plusMinus function to toggle the sign of the number displayed
    if (operator === '') {
        firstNum = plusMinus(firstNum).toString();
        updateDisplay(firstNum);
    } else {
        secondNum = plusMinus(secondNum).toString();
        updateDisplay(secondNum);
    }
});

moduloButton.addEventListener('click', () => {
    // Check if the result is already displayed as a percentage
    if (result.textContent.includes('%')) {
        // Revert the result back to its original value (non-percentage form)
        const originalValue = parseFloat(result.textContent) * 100;
        updateDisplay(originalValue);
    } else {
        // Convert the result to a percentage
        const percentValue = parseFloat(result.textContent) / 100;
        updateDisplay(percentValue + '%');
    }
});

// moduloButton.addEventListener('click', () => {
//     // Call the plusMinus function to toggle the sign of the number displayed
//     if (operator === '') {
//         firstNum = (firstNum / 100);
//         updateDisplay(firstNum);
//     } else {
//         secondNum = (secondNum / 100);
//         updateDisplay(secondNum);
//     }
// });

backspaceButton.addEventListener('click', () => {
    // Call the plusMinus function to toggle the sign of the number displayed
    if (operator === '') {
        if (firstNum === '' || firstNum.length === 1) {
            clearDisplay();
            firstNum = '';
        } else {
            firstNum = firstNum.slice(0, -1);
            updateDisplay(firstNum);
        }
    } else {
        if (secondNum === '' || secondNum.length === 1) {
            clearDisplay();
            secondNum = '';
        } else {
            secondNum = secondNum.slice(0, -1);
            updateDisplay(secondNum);
        }
    }
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Added if to not access equals button as operator
        if (button !== equalsButton) {
            if (firstNum !== '' && secondNum !== '') {
                // Perform previous operation before starting a new one
                operateAndDisplay();
            }
            operator = button.textContent;
        }
        
    });
});

equalsButton.addEventListener('click', () => {
    operateAndDisplay();
});

// Function to perform the operation and update the display
function operateAndDisplay() {
    if (firstNum === '' || secondNum === '') return;
    
    const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    // const roundedResult = parseFloat(result.toFixed(2)); // Round result to 2 decimal places
    // updateDisplay(roundedResult);
    updateDisplay(result);
    // Reset variables for next operation
    firstNum = result.toString();
    operator = '';
    secondNum = '';
}

// MoreZombies DL Done
// SimpleStatus DL Done
// Descriptive DL Done
// Extra Map Symbols DL Done
// Maps Legend UI DL Done
// FuelSide Indicator DL Done
// Dylans Zombie Loot DL Done
// Standardized DL
// Become Desensitized DL Done
// Paw Low Loot (41.50)DL Done
// Raven Creeks Spawn DL Done
// Snake's Mod Pack 41.71 Branch DL Done
// Combat Text (B40+B41) DL Done
// Paw Low Patch (build 41.77+ whatever) DL Done
