import { monkeys } from './monkeys.js';

const html = { main: () => document.getElementById('main') };

const actions = { BUTTON: showInfo };


fetch('template.hbs')
    .then(res => res.text())
    .then(source => {
        const template = Handlebars.compile(source);
        html.main().innerHTML = template({ monkeys });
    });

function showInfo(target) {
    const infoElement = target.closest('div.monkey').querySelector('p');
    infoElement.style.display = infoElement.style.display === 'none' ? 'block' : 'none';
}
document.addEventListener('click', handler);

function handler(ev) {
    if (typeof actions[ev.target.nodeName] === 'function') {
        actions[ev.target.nodeName](ev.target);
    }
}
