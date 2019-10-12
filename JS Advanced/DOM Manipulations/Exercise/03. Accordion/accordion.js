function toggle() {
    const content = document.querySelector('#extra');
    const [ span ] = document.querySelectorAll('span');

    if (span.textContent === 'More') {
        span.textContent = 'Less';
        content.style.display = 'block';
    } else {
        span.textContent = 'More';
        content.style.display = 'none';
    }
}
