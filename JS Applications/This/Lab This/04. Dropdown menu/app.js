function solve() {
    const box = document.querySelector('#box');
    const ul = document.querySelector('#dropdown-ul');

    document.querySelector('#dropdown').addEventListener('click', function () {
        if (ul.style.display === 'block') {
            ul.style.display = 'none';
            // box.style.backgroundColor = 'rgb(114, 112, 112)';
            // box.style.color = 'white';
            box.removeAttribute('style');
        } else {
            ul.style.display = 'block';
            
        }
    });

    Array.from(document.querySelectorAll('li')).forEach(x => {
        x.addEventListener('click', function () {
            box.style.backgroundColor = this.textContent;
            box.style.color = 'black';
        });
    });
}