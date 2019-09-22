function townsToJSON(params) {
    const output = [];
    const header = params
        .shift()
        .match(/\w+/gmi);

    for (let line of params) {
        let obj = {};
        line
        .split('|')
            .map(e => e.trim())
            .filter(e => e.length)
            .forEach((e, i) => {
                if (!isNaN(e)) {
                    e = Number(e);
                }
                obj[header[i]] = e;
            });
        output.push(obj);
    }
    return JSON.stringify(output);
}
// console.log(townsToJSON([
//     '| Town | Latitude | Longitude |',
//     '| Sofia | 42.696552 | 23.32601 |',
//     '| Beijing | 39.913818 | 116.363625 |'
// ]));
console.log(townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']));
