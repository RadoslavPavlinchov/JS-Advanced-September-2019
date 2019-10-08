function solve() {
    const patternExp = /[\d.]+ [+\-*\/] [\d.]+/g;
    const patternDel = /[+\-*\/]/g;

    let input = document.getElementById("expressionOutput");
    let result = document.getElementById("resultOutput");

    function calculate(string) {
        const delimiter = string.match(patternDel);
        const [a, b] = string.split(delimiter);
        const calc = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
        };
        return calc[delimiter](Number(a), Number(b));
    }

    const operators = ['+', '-', '*', '/'];

    [...document.querySelectorAll('button')]
    .forEach(e => e.addEventListener('click', (ev) => {
        if (ev.target.value === 'Clear') {
            input.innerHTML = '';
            result.innerHTML = '';
            return;
        }
        if (ev.target.value === '=') {
            result.innerHTML = input.innerHTML.match(patternExp) ?
                calculate(input.innerHTML) :
                'NaN';
        } else {
            input.innerHTML += operators.includes(ev.target.value) ?
                ' ' + ev.target.value + ' ' :
                ev.target.value;
        }
    }));
}
