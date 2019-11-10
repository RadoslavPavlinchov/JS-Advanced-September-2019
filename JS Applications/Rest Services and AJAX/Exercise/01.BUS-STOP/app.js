function getInfo() {
    const stopName = document.querySelector('#stopName');
    const busesList = document.querySelector('#buses');
    const stopId = document.querySelector('#stopId').value;
    const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;

    fetch(url)
        .then(res => {
            if (!res.ok) {
                stopName.textContent = 'Error';
                throw new Error(
                    `Unable to find a bus stop with this Stop ID: ${stopId}`
                );
            }
            return res.json();
        })
        .then(data => {
            const { name, buses } = data;
            stopName.textContent = name;
            Object.entries(buses).forEach(([id, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${id} arrives in ${time}`;
                busesList.appendChild(li);
            });
        });

    stopName.textContent = '';
    busesList.innerHTML = '';
}
