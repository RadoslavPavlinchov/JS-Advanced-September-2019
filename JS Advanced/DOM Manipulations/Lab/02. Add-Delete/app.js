function addItem() {
    const input = document.querySelector('#newText');

    function eventDelete(ev){
        ev.target.parentElement.parentElement.removeChild(ev.target.parentElement);
    }

    function createElement(type, content, attr) {
        const el = document.createElement(type);
        el.innerHTML = content;
        if (attr !== undefined) {
            el[attr.name] = attr.value;
        }
        return el;
    }

    function appendElements(parent, child) {
        return parent.appendChild(child).parentElement;
    }

    const a = createElement('a', '[Delete]', { name: 'href', value: '#' });
    const li = createElement('li', input.value);
    const ul = document.querySelector('#items');

    a.addEventListener('click', eventDelete);
    ul.appendChild(appendElements(li, a));

    input.value = '';
}
