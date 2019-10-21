class FilmStudio {

    constructor(studioName) {
        this.name = studioName;
        this.films = [];
    }

    casting(actor, role) {
        let isTheActorIsUnemployed = true;
        let output;

        if (this.films.length) {

            for (let f of this.films) {

                let roles = f.filmRoles.filter((r) => r.role === role);

                if (roles.length) {
                    let filmIndex = this.films.indexOf(f);
                    let wantedRole = this.films[filmIndex].filmRoles.filter((fR) => fR.role === role)[0];
                    let roleIndex = this.films[filmIndex].filmRoles.indexOf(wantedRole);

                    this.films[filmIndex].filmRoles[roleIndex].actor = actor;
                    isTheActorIsUnemployed = false;
                    output = `You got the job! Mr. ${actor} you are next ${role} in the ${f.filmName}. Congratz!`;
                    break;
                }
            }

            if (isTheActorIsUnemployed) {
                output = `${actor}, we cannot find a ${role} role...`;
            }

        } else {
            output = `There are no films yet in ${this.name}.`;
        }

        return output;
    }

    makeMovie(filmName, roles) {

        if (arguments.length === 2) {

            let firstArgIsString = typeof arguments[0] === 'string';
            let secondArgIsArray = arguments[1] instanceof Array;

            if (firstArgIsString && secondArgIsArray) {
                let findedFilms = this.films.filter((f) => f.filmName.includes(filmName));

                let filmRoles = roles.reduce((acc, cur) => {
                    let curFilmRole = {
                        role: cur,
                        actor: false
                    };
                    acc.push(curFilmRole);
                    return acc;
                }, []);

                let film = {
                    filmName,
                    filmRoles
                };

                if (findedFilms.length > 0) {
                    film.filmName += ` ${++findedFilms.length}`;
                }

                this.films.push(film);
                return film;
            } else {
                throw ('Invalid arguments')
            }

        } else {
            throw ('Invalid arguments count')
        }
    }

    lookForProducer(film) {

        let f = this.films.filter((f) => f.filmName === film)[0];
        let output;

        if (f) {
            output = `Film name: ${f.filmName}\n`;
            output += 'Cast:\n';
            Object.keys(f.filmRoles).forEach((role) => {
                output += `${f.filmRoles[role].actor} as ${f.filmRoles[role].role}\n`;
            });
        } else {
            throw new Error(`${film} do not exist yet, but we need the money...`)
        }

        return output;
    }
}
// module.exports = FilmStudio;

// const FilmStudio = require('./script');
// const expect = require('chai').expect;

// const assert = require('chai').assert;

describe('FilmStudio', () => {

    let instance;
    beforeEach(() => {
        instance = new FilmStudio('Boqna');
    });

    describe('Instantiation with one parameter - String', () => {
        it('.films', () => {
            expect(instance.films).to.deep.equal([]);
        });
        it('.name', () => {
            expect(instance.name).to.equal('Boqna');
        });
    });

    describe('makeMovie()', () => {
        it('Two params - string(filmName) and an array(roles)', () => {
            let test = instance.makeMovie('Zoro', ['main', 'secondary']);
            expect(test).to.deep.equal({
                filmName: 'Zoro',
                filmRoles: [{
                        role: 'main',
                        actor: false
                    },
                    {
                        role: 'secondary',
                        actor: false
                    }
                ]
            });
        });
        it('Two params - string(filmName) and an array(roles) - The sequel', () => {
            instance.makeMovie('Zoro', ['main', 'secondary']);
            let test1 = instance.makeMovie('Zoro', ['m', 's']);
            expect(test1).to.deep.equal({
                filmName: 'Zoro 2',
                filmRoles: [{
                        role: 'm',
                        actor: false
                    },
                    {
                        role: 's',
                        actor: false
                    }
                ]
            });
        });
        it('Invalid count of params - 1 param only', () => {
            expect(() => instance.makeMovie('Zoro')).to.throw('Invalid arguments count');
        });
        it('Invalid params - number instead of sting and array', () => {
            expect(() => instance.makeMovie(1, ['main', 'secondary'])).to.throw('Invalid arguments');
            expect(() => instance.makeMovie('Zoro', 1)).to.throw('Invalid arguments');
        });
    });

    describe('casting()', () => {
        it('correct two params', () => {
            instance.makeMovie('Zoro', ['main', 'secondary']);
            let test = instance.casting('Pesho', 'main');
            expect(test).to.equal('You got the job! Mr. Pesho you are next main in the Zoro. Congratz!');
        });
        it('correct two params, no movies', () => {
            let test = instance.casting('Pesho', 'main');
            expect(test).to.equal('There are no films yet in Boqna.');
        });
        it('correct two params, no role', () => {
            instance.makeMovie('Zoro', ['secondary']);
            let test = instance.casting('Pesho', 'main');
            expect(test).to.equal('Pesho, we cannot find a main role...');
        });
    });

    describe('lookForProducer()', () => {
        it('Correct param - Existing film - print', () => {
            instance.makeMovie('Zoro', ['main', 'secondary']);
            let test = instance.lookForProducer('Zoro');
            expect(test).to.equal(`Film name: Zoro\nCast:\nfalse as main\nfalse as secondary\n`);
        });
        it('Non Existing film', () => {
            instance.makeMovie('Zoro and Zoro', ['main', 'secondary']);
            expect(() => instance.lookForProducer('Zoro')).to.throw('Zoro do not exist yet, but we need the money...');
        });
    });
});