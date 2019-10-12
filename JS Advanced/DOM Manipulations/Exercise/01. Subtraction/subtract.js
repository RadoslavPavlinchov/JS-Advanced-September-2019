function subtract() {
    let first = document.querySelector('#firstNumber').value;
    let second = document.querySelector('#secondNumber').value;
    document.querySelector('#result').textContent = Number(first) - Number(second);
}
