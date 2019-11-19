(function () {
    document.getElementById('btnLoadTowns')
        .addEventListener('click', async function () {
            const towns = document.getElementById('towns')
                .value.split(', ');

            const source = await fetch('http://127.0.0.1:5500/JS%20Applications/Templating/Exercise/01.%20List%20Towns/towns.hbs')
                .then(res => res.text())
            const template = Handlebars.compile(source);
            const context = { towns }
            const townsHTML = template(context);

            document.getElementById('root')
                .innerHTML = townsHTML;
        })
}())