(function () {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    Array.prototype.skip = function (n) {
        return this.slice(n)
    }
    Array.prototype.take = function (n) {
        this.slice(n)
        return this;
    }
    Array.prototype.sum = function () {
        return this.reduce((a, b) => a + b, 0)
    }
    Array.prototype.average = function () {
        let elements = this.length
        return result = this.reduce((a, b) => a + b, 0) / elements;
    }
}());
