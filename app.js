document.addEventListener('DOMContentLoaded', function() {
    const screenTxt = document.getElementById('screenTxt');
    const cleaner = document.getElementById('btn-c');
    const buttonsNum = document.querySelectorAll('.num');
    const buttonsOp = document.querySelectorAll('.op');
    let firstValue = '';
    let secondValue = '';
    let operator = '';
    cleaner.addEventListener('click', clearScreen);

    buttonsNum.forEach(button => {
        button.addEventListener('click', () => {
            if (screenTxt.textContent === '0' || result !== '') {
                screenTxt.textContent = button.textContent;
                result = '';
            }  
            else if (screenTxt.textContent !== '0' || result !== ''){
                screenTxt.textContent += button.textContent;
            }
            if (!operator) {
                firstValue += button.textContent;
            } else {
                secondValue += button.textContent;
            }
        });
    });
    document.getElementById('btn-equal').addEventListener('click', () => {
        if (firstValue && secondValue && operator) {
            calculateAndDisplayResult();
        } else if (firstValue && !secondValue && operator) {
            screenTxt.textContent = calculateOneValue(firstValue, operator);
            firstValue = screenTxt.textContent;
            operator = '';
        }
    });
    buttonsOp.forEach(button => {
        button.addEventListener('click', () => {
            if (['+', '-', 'x', '/', 'xy'].includes(button.textContent)) {
                if (firstValue !== '' && secondValue === '') {
                    screenTxt.textContent = '0';
                    secondValue = '0';
                }
                operator = button.textContent;
            } else if (['sen', 'cos', 'tan', '√', 'bin', 'hex', 'oct', 'dec'].includes(button.textContent)) {
                operator = button.textContent;
                firstValue = screenTxt.textContent;
                calculateAndDisplayResult();
            }
        });
    }); 
    
    function clearScreen() {
        screenTxt.textContent = '0';
        firstValue = '';
        secondValue = '';
        operator = '';
    }
    
    function calculateAndDisplayResult() {
        if (firstValue && secondValue && operator) {
            const result = calculateTwoValues(firstValue, secondValue, operator);
            screenTxt.textContent = result;
            firstValue = result.toString();
            secondValue = '';
            operator = '';
        } else if (firstValue && !secondValue && operator) {
            const result = calculateOneValue(firstValue, operator);
            screenTxt.textContent = result;
            firstValue = result.toString();
            operator = '';
        }
    }
    
    

    function calculateTwoValues(first, second, op) {
        first = parseFloat(first);
        second = parseFloat(second);
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case 'x':
                return first * second;
            case '/':
                return first / second;
            case 'xy':
                return first ** second;
        }
    }

    function calculateOneValue(value, op) {
        value = parseFloat(value);
        switch(op) {
            case 'sen':
                return Math.sin(value * Math.PI / 180);
            case 'cos':
                return Math.cos(value * Math.PI / 180);
            case 'tan':
                return Math.tan(value * Math.PI / 180);
            case '√':
                return Math.sqrt(value) ;
            case 'bin':
                return parseInt(value).toString(2);
            case 'oct':
                return parseInt(value).toString(8);
            case 'hex':
                return parseInt(value).toString(16).toUpperCase();
            case 'dec':
                return parseInt(value, 2).toString(10);
        }
    }
});
