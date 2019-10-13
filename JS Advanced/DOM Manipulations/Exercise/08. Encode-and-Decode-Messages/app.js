function encodeAndDecodeMessages() {
    const sendInput = document.querySelectorAll('textarea')[0];
    const receiveInput = document.querySelectorAll('textarea')[1];

    const encodeBtn = document.querySelectorAll('button')[0];
    const decodeBtn = document.querySelectorAll('button')[1];

    function encode() {
        receiveInput.value = sendInput.value
        .split('')
        .map(char => char.charCodeAt() + 1)
        .map(code => String.fromCharCode(code))
        .join('');
        sendInput.value = ''; 
    }

    function decode() {
        receiveInput.value = receiveInput.value
        .split('')
        .map(char => char.charCodeAt() - 1)
        .map(code => String.fromCharCode(code))
        .join('');
    }
    encodeBtn.addEventListener("click", encode);
    decodeBtn.addEventListener('click', decode);
}
