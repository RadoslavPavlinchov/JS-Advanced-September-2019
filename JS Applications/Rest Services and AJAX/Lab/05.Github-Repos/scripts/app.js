function loadRepos() {
    const name = document.querySelector('#username').value;
    const list = document.querySelector('#repos');
    const url = `https://api.github.com/users/${name}/repos`;

    list.removeChild(list.firstElementChild);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                const li = document.createElement('li');
                const a = document.createElement('a');

                a.href = e.html_url;
                a.textContent = e.full_name;

                li.appendChild(a);
                list.appendChild(li);
            });
        })
        .catch(error => {
            const li = document.createElement('li');
            li.textContent = error;
            list.appendChild(li);
        });

    list.textContent = '';
}
