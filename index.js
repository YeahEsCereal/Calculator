const calculation = document.getElementById('calculation');
const smallCal = document.getElementById('smallCal');

function addToCalculation(number) {
    if (calculation.value === 'Error') {
        calculation.value = '';
    }
    if (number === '&#40;') {
        number = '(';
    }
    if (number === '&#41;') {
        number = ')';
    }
    if (['+', '-', 'x', '÷', '^', ')'].includes(number)) {
        smallCal.innerHTML += calculation.value + number;
        calculation.value = '';
        return;
    }
    if (smallCal.innerHTML !== '' && calculation.value === '') {
        calculation.value = number;
        return;
    }
    calculation.value += number;
}

function clearCalculation() {
    calculation.value = '';
    smallCal.innerHTML = '';
}

function evaluateCalculation() {
    calculation.value = smallCal.innerHTML + calculation.value;
    const splitCal = calculation.value.split('');
    if (splitCal === '') {
        return;
    }
    const characters = splitCal.map(char => {
        switch (char) {
            case 'x':
                return '*';
            case '÷':
                return '/';
            case '^':
                return '**';
            default:
                return char;
        }
    });
    if (splitCal.includes('**')) {
        calculation.value = 'Error';
        smallCal.innerHTML = '';
        return;
    }
    const finalCal = characters.join('');
    try {
        const expression = eval(finalCal);
        calculation.value = expression;
        smallCal.innerHTML = '';
        if (expression === 'Infinity') {
            calculation.value = 'Error';
            smallCal.innerHTML = '';
        }
    } catch {
        calculation.value = 'Error';
        smallCal.innerHTML = '';
    }
}
