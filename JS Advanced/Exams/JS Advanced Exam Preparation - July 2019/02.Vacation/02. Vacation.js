class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = Number(budget);
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        } else {
            if (this.kids[grade] !== undefined) {
                let arr = this.kids[grade]
                    .slice(0)
                    .map(x => `${x.substring(0, x.indexOf('-'))}`);
                if (arr.includes(name)) {
                    return `${name} is already in the list for this ${this.destination} vacation.`;
                }
                this.kids[grade].push(`${name}-${budget}`);
                return this.kids[grade];
            }
            this.kids[grade] = [];
            this.kids[grade].push(`${name}-${budget}`);
            return this.kids[grade];
        }
    }
    removeChild(name, grade) {
        if (this.kids[grade] === undefined) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
        let arr = this.kids[grade]
            .slice(0)
            .map(x => `${x.substring(0, x.indexOf('-'))}`);
        if (arr.indexOf(name) === -1) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
        this.kids[grade].splice(arr.indexOf(name), 1);
        return this.kids[grade];
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        let currentKidNumber = 1;
        Object
            .entries(this.kids)
            .sort((a, b) => a[0] - b[0])
            .forEach(e => {
                result += `Grade: ${e[0]}\n`;
                for (const kid of e[1]) {
                    result += `${currentKidNumber}. ${kid}\n`;
                    currentKidNumber++;
                }
                currentKidNumber = 1;
            });
        return result;
    }

    get numberOfChildren() {
        this._numberOfChildren = 0;
        for (const grade in this.kids) {
            this._numberOfChildren += this.kids[grade].length;
        }
        return this._numberOfChildren;
    }

}
let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
vacation.registerChild('Gosho', 5, 2000);
vacation.registerChild('Lilly', 6, 2100);

console.log(vacation.removeChild('Gosho', 9));

vacation.registerChild('Pesho', 6, 2400);
vacation.registerChild('Gosho', 5, 2000);

console.log(vacation.removeChild('Lilly', 6));
console.log(vacation.registerChild('Tanya', 5, 6000))