function loadCommits() {

    const html = {
        'username': () => document.getElementById('username'),
        'repository': () => document.getElementById('repo'),
    }

    const user = html.username().value;
    const repo = html.repository().value;

    const url = `https://api.github.com/repos/${user}/${repo}/commits`;

    const ul = document.getElementById('commits');

    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                const li = document.createElement('li');
                li.textContent = `Error: ${response.status} (${response.statusText})`
                ul.appendChild(li);
                return;
            }
            return response;
        })
        .then(r => r.json())
        .then(data => {
            data.forEach(e => {
                const li = document.createElement('li');
                li.textContent = `${e.commit.author.name}: ${e.commit.message}`
                ul.appendChild(li);
            });

        })
        .catch(err => err);

    html.username().value = ''
    html.repository().value = ''
    ul.innerHTML = '';

}
