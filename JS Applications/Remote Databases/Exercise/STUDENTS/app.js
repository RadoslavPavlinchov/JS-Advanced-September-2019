import { get, post } from './requester.js';

const html = {
    'getAllStudents': () => document.getElementById('all-students'),
    'getStudentFirstName': () => document.getElementById('firstName'),
    'getStudentLastName': () => document.getElementById('lastName'),
    'getStudentFacultyNumber': () => document.getElementById('facultyNumber'),
    'getStudentGrade': () => document.getElementById('grade'),
    'getStudentId': () => document.getElementById('id')
}

const actions = {
    'load-students': async function () {
        try {
            const students = await get('appdata', 'students02');
            const studentsContainer = html.getAllStudents();
            const fragment = document.createDocumentFragment();

            students.sort((a, b) => a.id - b.id);
            students.forEach(x => {
                const tr = document.createElement('tr');

                const idTd = document.createElement('td');
                const firstNameTd = document.createElement('td');
                const lastNameTd = document.createElement('td');
                const facultyNumberTd = document.createElement('td');
                const gradeTd = document.createElement('td');

                idTd.textContent = x.id;
                firstNameTd.textContent = x.firstName;
                lastNameTd.textContent = x.lastName;
                facultyNumberTd.textContent = x.facultyNumber;
                gradeTd.textContent = x.grade;

                tr.append(idTd, firstNameTd, lastNameTd, facultyNumberTd, gradeTd);

                fragment.appendChild(tr);
            })

            studentsContainer.innerHTML = '';
            studentsContainer.appendChild(fragment);

        } catch (err) {
            alert(err);
        }
    },
    'create-student': async function () {
        const id = html.getStudentId();
        const firstName = html.getStudentFirstName();
        const lastName = html.getStudentLastName();
        const facultyNumber = html.getStudentFacultyNumber();
        const grade = html.getStudentGrade();

        if (firstName !== null && lastName !== null && facultyNumber !== null && grade !== null && id !== null) {

            if (typeof Number(id.value) !== 'number') {
                throw new Error('Sorry, you have to use a number for the ID field!')
            }
            if (firstName.value === '') {
                throw new Error('Sorry, you have to use a string for the First name field!')
            }
            if (lastName.value === '') {
                throw new Error('Sorry, you have to use a string for the Last name field!')
            }
            if (typeof Number(facultyNumber.value) !== 'number') {
                throw new Error('Sorry, you have to use a number for the Faculty number field!')
            }
            if (typeof Number(grade.value) !== 'number') {
                throw new Error('Sorry, you have to use a number for the Grade field!')
            }
            const data = {
                id: id.value,
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            }

            try {
                await post('appdata', 'students02', data);

                id.value = '';
                firstName.value = '';
                lastName.value = '';
                facultyNumber.value = '';
                grade.value = '';

                actions['load-students']();
            } catch (err) {
                alert(err);
            }
        }
    }
}

function handleEvent(e) {
    if (typeof actions[e.target.id] === 'function') {
        e.preventDefault();

        actions[e.target.id]();
    }
}

(function attachEvents() {
    document.addEventListener('click', handleEvent);
}())
