/* eslint-disable max-classes-per-file */
function personAndTeacher() {
    class Person {
        name;
        email;
        constructor(n, e) {
            this.name = n;
            this.email = e;
        }
    }
    class Teacher extends Person {
        subject;
        constructor(n, e, s) {
            super(n, e);
            this.subject = s;
        }
    }

    return {
        Person,
        Teacher,
    }
}
personAndTeacher()
