function attachEvents() {
    const textArea = document.querySelector('#messages');
    const authorInput = document.querySelector('#author');
    const messageInput = document.querySelector('#content');
    const submitBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');
    const url = 'https://rest-messanger.firebaseio.com/messanger.json'

    submitBtn.addEventListener('click', handleSend);
    refreshBtn.addEventListener('click', handleRefresh);

    function handleRefresh() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let output = '';
                Object.entries(data)
                    .forEach(([key, post]) => {
                        output += `${post.author}: ${post.content}\n`
                        textArea.value = output;
                    });
            })
            .catch(handleError)
        textArea.value = '';
    }

    function handleSend() {
        const author = authorInput.value;
        const content = messageInput.value;

        if (author === '' || content === '') {
            return handleError();
        }

        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, content })
        }
        fetch(url, headers)
            .then(() => {
                authorInput.value = '';
                messageInput.value = '';
                handleRefresh()
            })
            .catch(handleError)
    }

    function handleError() {
        throw new Error('An unexpected error occurred!');
    }
}
attachEvents();
