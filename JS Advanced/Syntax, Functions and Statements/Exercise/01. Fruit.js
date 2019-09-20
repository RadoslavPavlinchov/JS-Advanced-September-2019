function fruit(...params) {
    let weight = params[1] / 1000;
    let money = weight * params[2];
    let fruitValue = params[0];
    return `I need $${money.toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruitValue}.`;
}
console.log(fruit('orange', 2500, 1.8));