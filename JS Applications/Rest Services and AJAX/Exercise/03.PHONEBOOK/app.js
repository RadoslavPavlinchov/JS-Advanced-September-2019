function attachEvents() {
    const btnLoad = document.querySelector('#btnLoad');
    const btnCreate = document.querySelector('#btnCreate');
    const personInput = document.querySelector('#person');
    const phoneInput = document.querySelector('#phone');
    const phoneBook = document.querySelector('#phonebook');

    btnCreate.addEventListener('click', handleCreate);
    btnLoad.addEventListener('click', handleLoad);

    function handleLoad() {
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(res => res.json())
            .then(data => {
                Object.entries(data)
                    .forEach(([key, acc]) => {
                        const { person, phone } = acc;

                        let li = document.createElement('li');
                        let btn = document.createElement('button');

                        li.textContent = `${person}: ${phone}`;
                        btn.setAttribute('data-target', key);
                        btn.textContent = 'Delete';
                        btn.addEventListener('click', handleDelete);

                        li.appendChild(btn);
                        phoneBook.appendChild(li);
                    });
            })
            .catch(handleError)

        phoneBook.innerHTML = '';
    }

    function handleCreate() {
        const person = personInput.value;
        const phone = phoneInput.value;

        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        }

        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', headers)
            .then(() => {
                personInput.value = '';
                phoneInput.value = '';
                phoneBook.innerHTML = '';

                handleLoad();
            })
            .catch(handleError)
    }

    function handleDelete(key) {
        const id = this.getAttribute('data-target');
        const headers = {
            method: 'DELETE'
        }
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`, headers)
            .then(() => {
                phoneBook.innerHTML = '';
                handleLoad();
            })
            .catch(handleError)
    }

    function handleError(err) {
        console.log('Error');
    }
}

attachEvents();
