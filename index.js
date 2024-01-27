const calculation = document.getElementById('calculation');
const smallCal = document.getElementById('smallCal')

function addToCalculation(number) {
    if (calculation.value == 'Error') {
        calculation.value = '';
    }
    if (number == '&#40;') {
        number = '(';
    }
    if (number == '&#41;') {
        number = ')';
    }
    if (number == '+' || number == '-' || number == 'x' || number == '÷' || number == '^') {
        smallCal.innerHTML += calculation.value + number;
        calculation.value = '';
        return;
    }
    if (smallCal.innerHTML != '' && calculation.value == '') {
        calculation.value = number;
        return;
    }
    calculation.value += number
}

function clearCalculation() {
    calculation.value = '';
    smallCal.innerHTML = '';
}

function evaluateCalculation() {
    let characters = [];
    calculation.value = smallCal.innerHTML + calculation.value;
    const splitCal = calculation.value.split('');
    if (splitCal == '') {
        return;
    }
    for (let i = 0; i <= splitCal.length; i++) {
        char = splitCal[i];
        switch (splitCal[i]) {
            case 'x':
                char = '*';
                break;
            case '÷':
                char = '/';
                break;
            case '^':
                char = '**';
                break;
        }
        if (splitCal[i] == '*' && splitCal[i + 1] == '*') {
            calculation.value = 'Error';
            smallCal.innerHTML = '';
            return;
        }
        characters.push(char);
    }
    const finalCal = characters.join('');
    try {
        const expression = eval(finalCal)
        calculation.value = expression;
        smallCal.innerHTML = '';
        if (expression == 'Infinity') {
            calculation.value = 'Error';
            smallCal.innerHTML = '';
        }
    } catch {
        calculation.value = 'Error';
        smallCal.innerHTML = '';
    }
}
