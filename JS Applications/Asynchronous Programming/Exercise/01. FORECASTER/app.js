import { fetchData } from './fetch.js'

const elements = {
    $location: () => document.getElementById('location'),
    $submit: () => document.getElementById('submit'),
    $current: () => document.getElementById('current'),
    $upcoming: () => document.getElementById('upcoming'),
    $forecast: () => document.getElementById('forecast')
};

const weatherSymbols = {
    sunny: '☀',
    partlysunny: '⛅',
    overcast: '☁',
    rain: '☂',
    degrees: '°'
};

function attachEvents() {
    elements.$submit().addEventListener('click', getWeatherInfo);

    function getWeatherInfo() {
        const location = elements.$location().value;

        fetchData().locations()
            .then((locations) => {
                const { code } = locations.find((obj) => obj.name === location)

                return Promise.all([
                    fetchData().today(code),
                    fetchData().upcoming(code)
                ])
            })
            .then(([today, upcoming]) => {
                generateWeatherInfo(today, upcoming)
            })
            .catch(error => handleError())
    }

    function generateWeatherInfo(today, upcoming) {
        elements.$current().innerHTML = '';
        elements.$current().innerHTML = '<div class="label">Current conditions</div>';

        elements.$forecast().style.display = 'block';

        const { condition, low, high } = today.forecast;
        const { name } = today;
        const symbol = getNormalizedSymbol(condition);

        const $divForecastWrapper = createHTMLElement('div', ['forecasts']);
        const $spanSymbol = createHTMLElement('span', ['condition', 'symbol'], weatherSymbols[symbol]);
        const $spanWrapper = createHTMLElement('span', ['condition'])
        const $spanName = createHTMLElement('span', ['forecast-data'], name);

        const degreesInfo = `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`;
        const $spanDegrees = createHTMLElement('span', ['forecast-data'], degreesInfo);

        const $spanCondition = createHTMLElement('span', ['forecast-data'], condition);

        $spanWrapper.append($spanName, $spanDegrees, $spanCondition);
        $divForecastWrapper.append($spanSymbol, $spanWrapper);
        elements.$current().appendChild($divForecastWrapper);

        generateUpcomingWeatherInfo(upcoming)
    }

    function generateUpcomingWeatherInfo(upcoming) {
        const $divWrapper = createHTMLElement('div', ['forecast-info']);

        upcoming.forecast.forEach(o => {
            elements.$upcoming().innerHTML = '';
            elements.$upcoming().innerHTML = '<div class="label">Three-day forecast</div>';

            const { condition, low, high } = o;
            const symbol = getNormalizedSymbol(o.condition);
            const degreesRange = `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`;

            const $spanUpcoming = createHTMLElement('span', ['upcoming']);

            const $spanSymbol = createHTMLElement('span', ['symbol'], weatherSymbols[symbol]);
            const $spanDegrees = createHTMLElement('span', ['forecast-data'], degreesRange);
            const $spanCondition = createHTMLElement('span', ['forecast-data'], condition);

            $spanUpcoming.append($spanSymbol, $spanDegrees, $spanCondition);
            $divWrapper.appendChild($spanUpcoming);
        });
        elements.$upcoming().appendChild($divWrapper);
    }

    function getNormalizedSymbol(symbol) {
        return symbol.split('').filter((c) => c !== ' ').map((c) => c.toLowerCase()).join('');
    }

    function createHTMLElement(tagName, classNames, textContent) {
        const element = document.createElement(tagName);

        if (classNames) {
            element.classList.add(...classNames);
        }
        if (textContent) {
            element.textContent = textContent;
        }
        return element;
    }

    function handleError(error) {
        elements.$forecast().style.display = 'block';
        elements.$current().innerHTML = '';
        elements.$upcoming().innerHTML = '';
        elements.$current().textContent = 'Error';
    }

}
attachEvents();
