function solve(...params) {
    let sum = params.reduce((a, b) => a + b.length, 0);
    let avg = Math.floor(sum / params.length);
    return [sum, avg].join("\n");
}
console.log(solve('chocolate', 'ice cream', 'cake'));