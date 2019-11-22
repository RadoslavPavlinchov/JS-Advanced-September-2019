const username = "Radko";
const password = "radko";

const baseUrl = "https://baas.kinvey.com"
const appKey = "kid_rkOIWvaor";
const appSecret = "507749643cff425e9cd2d17bccf5855d";

function makeHeaders(httpMethod, data) {
    const headers = {
        method: httpMethod,
        headers: {
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
            "Content-Type": "application/json"
        }
    }

    if (httpMethod === "POST" || httpMethod === "PUT") {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function handleError(e) {
    if (!e.ok) {
        throw new Error(e.statusText);
    }

    return e;
}

function serializeData(x) {
    return x.json();
}

function fetchData(kinveyModule, endPoint, headers) {
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData)
}

export function get(kinveyModule, endPoint) {
    const headers = makeHeaders("GET");

    return fetchData(kinveyModule, endPoint, headers);
}

export function post(kinveyModule, endPoint, data) {
    const headers = makeHeaders("POST", data);

    return fetchData(kinveyModule, endPoint, headers);
}

export function put(kinveyModule, endPoint, data) {
    const headers = makeHeaders("PUT", data);

    return fetchData(kinveyModule, endPoint, headers);
}

export function del(kinveyModule, endPoint) {
    const headers = makeHeaders("DELETE");

    return fetchData(kinveyModule, endPoint, headers);
}