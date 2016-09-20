var loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click",login,true);

function login(){
    var userName = document.getElementById("userName").value,
        password = document.getElementById("password").value;

    if (userName === "admin" && password === "admin"){
        this.href = "sample-index.html";
    }
}