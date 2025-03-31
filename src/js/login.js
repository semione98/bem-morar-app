import api from "./api/api-login";

const formLogin = document.getElementById("formLogin");
const email = document.getElementById("usrname");
const password = document.getElementById("psw");

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue === "" || passwordValue === "") {
        alert("Por favor, preencha os campos de email e senha.");
        return;
    }

    const loginData = {
        email: emailValue,
        password: passwordValue
    };

    await api.loginPost(loginData)



});