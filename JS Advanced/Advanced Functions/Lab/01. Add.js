function add(num) {

    return function (addend) {
        return num + addend;
    };
    
}
let add5 = add(5);
console.log(add5(2));
console.log(add5(3));
