class BookStore {
    constructor(name) {
        this.name = name;
        this.books = [];
        this._workers = [];
    }

    get workers() {
        return this._workers;
    }

    stockBooks(newBooks) {
        newBooks.forEach((book) => {
            let [title, author] = book.split('-');
            this.books.push({ title, author });
        });

        return this.books;
    }

    hire(name, position) {
        let worker = this.workers.filter(w => w.name === name)[0];
        if (!worker) {
            worker = {
                name: name,
                position: position,
                booksSold: 0
            };
            this.workers.push(worker);
        } else {
            throw new Error('This person is our employee');
        }
        return `${name} started work at ${this.name} as ${position}`
    }

    fire(name) {
        let worker = this.workers.filter(w => w.name === name)[0];
        if (!worker) {
            throw new Error(`${name} doesn't work here`);
        }
        let index = this.workers.indexOf(worker);
        this.workers.splice(index, 1);
        return `${name} is fired`;
    }

    sellBook(title, workerName) {
        let book = this.books.filter(b => b.title === title)[0];
        if (!book) {
            throw new Error('This book is out of stock');
        }

        let worker = this.workers.filter((w) => w.name === workerName)[0];
        if(!worker){
            throw new Error(`${workerName} is not working here`)
        }

        this.books = this.books.filter(b => b.title !== title);
        this.workers.filter(w => w.name === workerName).map(w => w.booksSold++);
    }

    printWorkers() {
        let result = "";
        this.workers.forEach(w => {
            result += `Name:${w.name} Position:${w.position} BooksSold:${w.booksSold}\n`;
        })
        return result.trim();
    }
}
// module.exports = BookStore;

// const BookStore = require('./script');
// const expect = require('chai').expect;

// const assert = require('chai').assert;

describe('BookStore', () => {

    let instance;
    beforeEach(() => {
        instance = new BookStore('Orange');
    });

    describe('Instantiation', () => {
        it('should have .books', () => {
            expect(instance.books).to.deep.equal([]);
            expect(instance.name).to.equal('Orange');
        });
        it('should have .workers', () => {
            expect(instance.workers).to.deep.equal([]);
            expect(instance._workers).to.deep.equal([]);
        });
    });

    describe('stockBooks()', () => {
        it('array with two correct books', () => {
            expect(instance.stockBooks(['book1-author1'])).to.deep.equal([{ title: 'book1', author: 'author1' }]);
            expect(instance.books.length).to.equal(1);
        });
    });
    
    describe('hire()', () => {
        it('already hired', () => {
            instance.hire('Pesho', 'developer');
            const test = () => instance.hire('Pesho', 'developer');
            expect(test).to.throw(Error, 'This person is our employee');
        });
        it('get hired', () => {
            expect(instance.hire('Pesho', 'developer')).to.equal('Pesho started work at Orange as developer');
        });
        it('.workers', () => {
            instance.hire('Pesho', 'developer');
            expect(instance.workers.length).to.equal(1);
            expect(instance.workers[0].name).to.equal('Pesho');
            expect(instance.workers[0].position).to.equal('developer');
            expect(instance.workers[0].booksSold).to.equal(0);

            expect(instance._workers.length).to.equal(1);
            expect(instance._workers[0].name).to.equal('Pesho');
            expect(instance._workers[0].position).to.equal('developer');
            expect(instance._workers[0].booksSold).to.equal(0);
        });
        it('get hired', () => {
            expect(instance.hire('Pesho')).to.equal('Pesho started work at Orange as undefined');
        });
    });

    describe('fire()', () => {
        it('if he does not Exist', () => {
            instance.hire('Pesho', 'developer');
            const test = () => instance.fire('Gosho');
            expect(test).to.throw(Error, "Gosho doesn't work here");
        });
        it('if he does Exist', () => {
            instance.hire('Pesho', 'developer');
            expect(instance.fire('Pesho')).to.equal("Pesho is fired");
        });
    });

    describe('sellBook()', () => {
        it('book missing', () => {
            instance.hire('Pesho', 'developer');
            const test = () => instance.sellBook('HarryPotter', 'Pesho');
            expect(test).to.throw(Error, "This book is out of stock");
        });
        it('worker missing', () => {
            instance.hire('Pesho', 'developer');
            instance.stockBooks(['HarryPotter-alabala']);
            const test = () => instance.sellBook('HarryPotter', 'Gosho');
            expect(test).to.throw(Error, "Gosho is not working here");
        });
        it('correctly', () => {
            instance.hire('Pesho', 'developer');
            instance.stockBooks(['HarryPotter-alabala']);
            instance.sellBook('HarryPotter', 'Pesho');
            expect(instance.workers[0].booksSold).to.equal(1);
            expect(instance._workers[0].booksSold).to.equal(1);
        });
    });

    describe('printWorkers()', () => {
        it('just ptint', () => {
            instance.hire('Pesho', 'developer');
            instance.stockBooks(['HarryPotter-alabala']);
            instance.sellBook('HarryPotter', 'Pesho');
            expect(instance.printWorkers()).to.equal(`Name:Pesho Position:developer BooksSold:1`);
        });
    });

});
