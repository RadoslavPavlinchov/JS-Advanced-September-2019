function printArrayWithGivenDelimiter(array) {
    let delimeter = array.splice(-1).join();
    return array.join(`${delimeter}`);
}
console.log(printArrayWithGivenDelimiter(
    [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "-"
    ]
));
