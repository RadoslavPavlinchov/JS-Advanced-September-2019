const html = {
    allCats: () => document.getElementById('allCats')
};

const actions = {
    showBtn: showInfo
};

function showInfo(target) {
    const statusDiv = target.closest('li').querySelector('.status');
    statusDiv.style.display = statusDiv.style.display === 'none' ? 'block' : 'none';
}

fetch('./all-cats.hbs')
    .then(res => res.text())
    .then(source => {
        const template = Handlebars.compile(source);
        html.allCats().innerHTML = template({ cats: window.cats });
    })

document.addEventListener('click', handler);

function handler(e) {
    if (typeof actions[e.target.className] === 'function') {
        actions[e.target.className](e.target);
    }
}

