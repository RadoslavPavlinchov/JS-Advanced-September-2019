function createArticle() {
	let title = document.getElementById("createTitle").value;
	let content = document.getElementById("createContent").value;
	let section = document.getElementById("articles");

	function create(t, c) {
		let article = document.createElement("article");
		let h3 = document.createElement("h3");
		let p = document.createElement("p");

		article.appendChild(h3);
		article.appendChild(p);

		h3.textContent = t;
		p.textContent = c;

		return article;
	}

	if (title && content) {
		const newArticle = create(title, content);
		section.appendChild(newArticle);
		document.getElementById('createTitle').value = "";
        document.getElementById('createContent').value = "";
	}
}



    // <div id="createArticle">
    // <label for="createTitle">Title</label>
    // <input id="createTitle"/><br>
    // <label for="createContent">Content</label>
    // <textarea id="createContent"></textarea>
