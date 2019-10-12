function notify(message) {
    const notification = document.querySelector('#notification');

    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
