const url = (id = '') => `https://fir-eb382.firebaseio.com/catches/${id}.json`;

function get() {
    return fetch(url())
        .then(errorHandler)
        .then(res => res.json());
}

function post(data) {
    const headers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    return fetch(url(), headers)
        .then(errorHandler)
        .then(res => res.json());
}

function put(id, data) {
    const headers = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    return fetch(url(id), headers)
        .then(errorHandler)
        .then(res => res.json());
}

function del(id) {
    const headers = { method: 'DELETE' };
    return fetch(url(id), headers)
        .then(errorHandler);
}

function errorHandler(res) {
    if (!res.ok) {
        throw new Error('Something went wrong !!');
    }
    return res;
}

export const fetchData = {
    get,
    post,
    put,
    del,
};
