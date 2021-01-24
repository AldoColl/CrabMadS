var ARTICLE_ENDPOINT = "/api/v1/articles";

function checkAuth() {
    var urlParams = new URLSearchParams(window.location.search);

    if(localStorage.getItem('authUser') == null) {
        if(urlParams.get("auth") == null) {
            hideElement("user-display");
            hideElement("create-button");
            hideElement("update-button");
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

function submitUpdateArticle() {
    var urlParams = new URLSearchParams(window.location.search);

    fetch(ARTICLE_ENDPOINT, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            id: urlParams.get("id"),
            content: document.getElementById('article-content').value
        })
    })
    .then(response => window.location = "/article.html?id="+urlParams.get("id"))
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

function loadArticleForm() {
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.get("id") == null) {
        window.location = "/";
    } else {
        fetch(ARTICLE_ENDPOINT + "/" + urlParams.get("id"), {
            method: 'get'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if(json.author == localStorage.getItem('authUser')) {
                document.getElementById("article-content").defaultValue = json.content;
                document.getElementById("article-url").setAttribute("href", "/article.html?id=" + json.id);
            } else {
                window.location = "/";
            }
        });
    }
}

function loadArticle() {
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.get("id") == null) {
        window.location = "/";
    } else {
        fetch(ARTICLE_ENDPOINT + "/" + urlParams.get("id"), {
            method: 'get'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById("article-author").appendChild(document.createTextNode(json.author));
            document.getElementById("article-created").appendChild(document.createTextNode(json.created));
            document.getElementById("article-updated").appendChild(document.createTextNode(json.updated));
            document.getElementById("article-content").appendChild(document.createTextNode(json.content));
            if(localStorage.getItem('authUser') == json.author){
                document.getElementById("update-button").setAttribute("href", "/update.html?id=" + json.id);
            } else {
                hideElement("update-button");
            }
        });
    }
}

function loadUserData() {
    if(localStorage.getItem('authUser') != null)  {
        document.getElementById("user-display").textContent = localStorage.getItem('authUser');
    }
}

function hideElement(elementId) {
    if(document.getElementById(elementId) != null){
        document.getElementById(elementId).classList.add("core");
        document.getElementById(elementId).classList.add("hidden");
    }
}