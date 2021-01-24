var ARTICLE_ENDPOINT = "/api/v1/articles";

function checkAuth() {
    var urlParams = new URLSearchParams(window.location.search);

    if(localStorage.getItem('authUser') == null) {
        if(urlParams.get("auth") == null) {
            hideElement("user-display");
            hideElement("create-button");
        } else {
            localStorage.setItem('authUser', urlParams.get("auth"));
            document.getElementById("user-display").textContent = localStorage.getItem('authUser');
            hideElement("login-button");
        }
    } else {
        hideElement("login-button")
        document.getElementById("user-display").textContent = localStorage.getItem('authUser');
    }
}

function submitCreateArticle() {
    fetch(ARTICLE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            content: document.getElementById('article-content').value
        })
    })
    .then(response => window.location = "/")
    .catch(error => console.log(error));
}

function loadArticleList() {
    fetch(ARTICLE_ENDPOINT, {
        method: 'get'
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        var list = document.getElementById("article-list");

        json.forEach(element => {
            var item = document.createElement("li");
            var link = document.createElement("a");

            link.setAttribute("href", "/article.html?id=" + element.id);
            link.appendChild(document.createTextNode(element.content.substring(0, 20)));
            item.appendChild(link);
            item.appendChild(document.createTextNode(" on " + element.created + " by " + element.author))
            list.appendChild(item);
        })
    })
    .catch(error => console.log(error));
}

function hideElement(elementId) {
    document.getElementById(elementId).classList.add("core");
    document.getElementById(elementId).classList.add("hidden");
}