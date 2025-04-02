import { updateUi } from "./login.js";
import { getUserDataFromToken } from "./login.js";


document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (token) {
        const objtToken = {
            token: token
        }

        const user = await getUserDataFromToken(objtToken);
        console.log(user)

        updateUi(user);


        console.log(token)

    }

});