import apiLogin from "./api/api-login.js";


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

    const response = await apiLogin.loginPost(loginData)
    console.log(response)
    const user = response.user;
    console.log(user)
    const token = response.token;

    if (token) {
        localStorage.setItem("token", token);
    }

    updateUi(user);



});

export function updateUi(user) {
    const divBtnLogin = document.querySelector(".app__header__menu__content__login")
    divBtnLogin.innerHTML = `
        <p>Olá, ${user.name}</p>
        <button id="btnLogout">Sair</button>
    `

}


export function getUserDataFromToken(token) {

    const user = apiLogin.loginToken(token);
    if (user) {
        return user;
    } else {
        alert("Erro ao obter dados do usuário.");
    }

}