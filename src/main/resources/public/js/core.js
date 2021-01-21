function checkAuth() {
    var urlParams = new URLSearchParams(window.location.search);

    if(localStorage.getItem('authUser') == null) {
        if(urlParams.get("auth") === undefined) {
            document.getElementById("user-display").classList.add("core");
            document.getElementById("user-display").classList.add("hidden");
        } else {
            localStorage.setItem('authUser', urlParams.get("auth"));
            document.getElementById("login-button").classList.add("core");
            document.getElementById("login-button").classList.add("hidden");
            document.getElementById("user-display").textContent = localStorage.getItem('authUser');
        }
    } else {
        document.getElementById("login-button").classList.add("core");
        document.getElementById("login-button").classList.add("hidden");
        document.getElementById("user-display").textContent = localStorage.getItem('authUser');
    }
}