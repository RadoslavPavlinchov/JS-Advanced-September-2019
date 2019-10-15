const expect = require('chai').expect;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe('isOddOrEven', function () {
    it('should return undefined with a number parameter', function() {
        expect(isOddOrEven(13)).to.equal(undefined, 'Funciuton did not return the correct result');
    });
    it('should return undefined with an object parameter', function () {
        expect(isOddOrEven({name: 'George'})).to.equal(undefined, 'Funciton did not return correct result');
    });
    it('Sting param with even length, should return even', function () {
        let expected = isOddOrEven('adda');
        expect(expected).to.equal('even', 'Function returns the correct result with even string length');
    });
    it('Sting param with odd length, should return odd', function () {
        let expected = isOddOrEven('add');
        expect(expected).to.equal('odd', 'Function returns the correct result with odd string length');
    });
});