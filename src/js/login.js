import apiLogin from "./api/api-login.js";

const modalLogin = document.getElementById("myModal");
const formLogin = document.getElementById("formLogin");
const email = document.getElementById("usrname");
const password = document.getElementById("psw");

if (formLogin) {
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
            JSON.stringify(localStorage.setItem("token", token));
        }

        updateUi(user);
    });
}



export function updateUi(user) {
    const divBtnLogin = document.querySelector(".app__header__menu__content__login")

    if (user) {
        const paragrafoUserName = document.createElement("p")
        const btnLogout = document.createElement("button")
        divBtnLogin.innerHTML = ""

        paragrafoUserName.innerText = `Olá, ${user.name}`
        btnLogout.innerText = "Sair"
        btnLogout.id = "btnLogout"
        btnLogout.classList.add("btn")
        btnLogout.classList.add("btn-default")
        btnLogout.classList.add("btn-lg")

        btnLogout.onclick = logout;

        divBtnLogin.appendChild(paragrafoUserName)
        divBtnLogin.appendChild(btnLogout)
    } else {
        divBtnLogin.innerHTML = `
        <button class="app__header__menu__content__login__button header__button__cadastro btn btn-default btn-lg" id="btnCadastro">Criar conta</button>
        <button class="app__header__menu__content__login__button header__button__entrar btn btn-default btn-lg" id="myBtn">Entrar</button>
    `
        console.log("não tem usuário")
    }








}


export async function getUserDataFromToken(token) {

    const user = await apiLogin.loginToken(token);
    if (user) {
        console.log(user)
        return user;
    } else {
        alert("Erro ao obter dados do usuário.");
    }

}

function logout() {
    localStorage.removeItem("token");
    location.reload()
    // updateUi(null)
}