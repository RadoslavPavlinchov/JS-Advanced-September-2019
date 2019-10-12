function validate() {
    document.querySelector('#email').addEventListener('change', (ev) => {
        const pattern = /[a-z]+@[a-z]+.[a-z]+/gi;
        if (ev.target.value.match(pattern)) {
            ev.target.classList.remove('error');
        } else {
            ev.target.classList.add('error');
        }
    });
}
