const username = 'Radko';
const password = 'radko';

const appKey = 'kid_rkOIWvaor';
const appSecret = '507749643cff425e9cd2d17bccf5855d';

const baseUrl = 'https://baas.kinvey.com';

function makeHeaders(httpMethod, data) {
    const headers = {
        method: httpMethod,
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
        }
    }

    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function handleError(err) {
    if (!err.ok) {
        throw new Error(e.statusText);
    }
    return err;
}

function serializeData(x) {
    return x.json();
}

function fetchData(kinveyModule, endpoint, headers) {
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData)
}

export function get(kinveyModule, endpoint) {
    const headers = makeHeaders('GET');

    return fetchData(kinveyModule, endpoint, headers);
}

export function post(kinveyModule, endpoint, data) {
    const headers = makeHeaders('POST', data);

    return fetchData(kinveyModule, endpoint, headers);
}

export function put(kinveyModule, endpoint, data) {
    const headers = makeHeaders('PUT', data);

    fetchData(kinveyModule, endpoint, headers);
}

export function del(kinveyModule, endpoint) {
    const headers = makeHeaders('DELETE');

    fetchData(kinveyModule, endpoint, headers);
}