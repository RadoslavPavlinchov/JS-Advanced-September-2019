function showInfo(e) {
    const infoDiv = e.parentNode.getElementsByClassName("infoData")[0];
    infoDiv.style.display = infoDiv.style.display === "block" ? "none" : "block";
}

(() => {
    renderMonkeyTemplate();

    async function renderMonkeyTemplate() {
        const source = await fetch("http://127.0.0.1:5500/JS%20Applications/Templating/Exercise/03.%20Popular%20Monkeys/templates/all-monkeys.hbs")
            .then(res => res.text());
        const template = Handlebars.compile(source);
        const context = { monkeys: window.monkeys };
        const monkeysHTML = template(context);

        document.getElementById("monkeys")
            .innerHTML = monkeysHTML;
    }

})()
