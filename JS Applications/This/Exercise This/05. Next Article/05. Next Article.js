function getArticleGenerator(articles) {
    let idx = 0;
    return function () {
        let article = document.createElement('article');
        article.textContent = articles[idx];
        if (idx < articles.length) {
            idx++;
            return document.getElementById('content').appendChild(article);
        }
    }
}