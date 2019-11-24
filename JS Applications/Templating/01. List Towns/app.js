const html = {
    towns: () => document.getElementById('towns'),
    root: () => document.getElementById('root')
};

const actions = { btnLoadTowns: getInput };

async function getInput() {
    const towns = html.towns()
        .value
        .split(', ');

    const source = await fetch('towns.hbs')
        .then(res => res.text());
    const template = Handlebars.compile(source);
    html.root().innerHTML = template({ towns });
    html.towns().value = '';
}

document.addEventListener('click', handler);

function handler(e) {
    if (typeof actions[e.target.id] === 'function') {
        e.preventDefault();
        actions[e.target.id]();
    }
}
