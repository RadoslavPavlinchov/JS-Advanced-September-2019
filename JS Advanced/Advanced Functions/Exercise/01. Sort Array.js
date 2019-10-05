function solve(array, str) {
    return str === "asc" ?
        [...array].sort((a, b) => a - b) :
        [...array].sort((a, b) => b - a);
}
console.log(solve([14, 7, 17, 6, 8], "asc"));
