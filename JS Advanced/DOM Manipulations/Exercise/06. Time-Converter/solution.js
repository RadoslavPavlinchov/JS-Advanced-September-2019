function attachEventsListeners() {
    const convertFrom = {
        'days': (days) => {
            const hours = days * 24;
            const minutes = hours * 60;
            const seconds = minutes * 60;

            return [hours, minutes, seconds];
        },
        'hours': (hours) => {
            const days = hours / 24;
            const minutes = hours * 60;
            const seconds = minutes * 60;

            return [days, minutes, seconds];
        },
        'minutes': (minutes) => {
            const hours = minutes / 60;
            const days = hours / 24;
            const seconds = minutes * 60;

            return [days, hours, seconds];
        },
        'seconds': (seconds) => {
            const minutes = seconds / 60;
            const hours = minutes / 60;
            const days = hours / 24;

            return [days, hours, minutes];
        }
    };

    const daysInput = document.querySelector('#days');
    const hoursInput = document.querySelector('#hours');
    const minutesInput = document.querySelector('#minutes');
    const secondsInput = document.querySelector('#seconds');

    function inputHandler(currentI, unit, firstI, secondI, thirdI) {
        const value = Number(currentI.value);

        let [firstUnit, secondUnit, thirdUnit] = convertFrom[unit](value);
        firstI.value = firstUnit;
        secondI.value = secondUnit;
        thirdI.value = thirdUnit;
    }

    document.querySelector('#daysBtn').addEventListener('click', () =>
        inputHandler(daysInput, 'days', hoursInput, minutesInput, secondsInput));

    document.querySelector('#hoursBtn').addEventListener('click', () =>
        inputHandler(hoursInput, 'hours', daysInput, minutesInput, secondsInput));

    document.querySelector('#minutesBtn').addEventListener('click', () =>
        inputHandler(minutesInput, 'minutes', daysInput, hoursInput, secondsInput));

    document.querySelector('#secondsBtn').addEventListener('click', () =>
        inputHandler(secondsInput, 'seconds', daysInput, hoursInput, minutesInput));
}
