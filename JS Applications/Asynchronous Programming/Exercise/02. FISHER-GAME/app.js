import { fetchData } from './fetchData.js';

const html = {
    formInputs: {
        angler: () => document.querySelector('#addForm input.angler'),
        weight: () => document.querySelector('#addForm input.weight'),
        species: () => document.querySelector('#addForm input.species'),
        location: () => document.querySelector('#addForm input.location'),
        bait: () => document.querySelector('#addForm input.bait'),
        captureTime: () => document.querySelector('#addForm input.captureTime'),
    },
    addBtn: () => document.querySelector('#addForm button.add'),
    loadBtn: () => document.querySelector('aside button.load'),
    exampleCatch: () => document.querySelector('#catches div.catch'),
    catchesDiv: () => document.querySelector('#catches'),
};

async function loadCatches(html) {
    const data = await fetchData.get();
    const fragment = document.createDocumentFragment();

    Object.entries(data).forEach(([id, dataCatch]) => {
        const copy = html.exampleCatch().cloneNode(true);

        if (copy.children[0].nodeName === 'H4') {
            copy.children[0].remove();
        }

        copy.setAttribute('data-id', id);

        Object.keys(dataCatch).forEach(key => {
            copy.querySelector(`input.${key}`).value = dataCatch[key];
        });

        copy.querySelector('button.update').addEventListener('click', updateHandler);
        copy.querySelector('button.delete').addEventListener('click', deleteHandler.bind(undefined, html));

        fragment.appendChild(copy);
    });

    html.catchesDiv().innerHTML = '';
    html.catchesDiv().appendChild(fragment);
}

async function addCatch(html) {
    const data = Object.keys(html.formInputs)
        .reduce((acc, curr) => {
            acc[curr] = html.formInputs[curr]().value;
            return acc;
        }, {});

    Object.keys(data).forEach(key => {
        if (data[key] === '') {
            alert(`${key} input is empty, Please fill all input fields!`);
            throw new Error('All input fields should be filled');
        }
    });

    Object.values(html.formInputs).forEach(e => e().value = '');

    try {
        await fetchData.post(data);
    } catch (err) {
        console.error('Something went wrong!');
    }
}

async function updateHandler(ev) {
    const id = ev.target.parentNode.getAttribute('data-id');
    const data = [...ev.target.parentNode.querySelectorAll('input')]
        .reduce((acc, curr) => {
            acc[curr.className] = curr.value;
            return acc;
        }, {});

    const h4 = document.createElement('h4');
    h4.textContent = 'Updated!';
    h4.style.color = 'red';
    ev.target.parentNode.prepend(h4);

    await fetchData.put(id, data);
}

async function deleteHandler(html, ev) {
    const id = ev.target.parentNode.getAttribute('data-id');
    await fetchData.del(id);
    await loadCatches(html);
}

html.addBtn().addEventListener('click', addCatch.bind(undefined, html));
html.loadBtn().addEventListener('click', loadCatches.bind(undefined, html));
