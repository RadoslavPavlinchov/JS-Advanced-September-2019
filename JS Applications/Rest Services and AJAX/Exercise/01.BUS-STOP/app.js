function getInfo() {
    const stopName = document.querySelector('#stopName');
    const busesList = document.querySelector('#buses');
    const stopId = document.querySelector('#stopId').value;
    const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { name, buses } = data;
            stopName.textContent = name;
            Object.entries(buses)
                .forEach(([busId, busTime]) => {
                    const li = document.createElement('li');
                    li.textContent = `Bus ${busId} arrives in ${busTime}`;
                    busesList.appendChild(li);
                });
        })
        .catch(err => stopName.textContent = 'Error');

    stopName.textContent = '';
    busesList.innerHTML = '';
}
