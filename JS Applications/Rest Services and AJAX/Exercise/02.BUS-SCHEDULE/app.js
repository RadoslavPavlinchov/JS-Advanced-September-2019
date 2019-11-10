function solve() {
    const infoBox = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let currentStop = 'depot';
    let arrivingAt;

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentStop}.json`)
            .then(res => res.json())
            .then(data => {
                let { name, next } = data;
                currentStop = next;
                arrivingAt = name;
                infoBox.textContent = `Next stop ${name}`;

                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(err => {
                infoBox.textContent = 'Error'
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${arrivingAt}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
