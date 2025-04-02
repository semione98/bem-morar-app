const urlBase = 'http://localhost:3000';

const apiLogin = {

    async loginPost(loginData) {
        try {
            const response = await fetch(`${urlBase}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (!response.ok) {
                const responseError = await response.json();
                throw new Error('Network response was not ok ' + responseError.error);
                return
            }
            const data = await response.json();
            console.log('Login bem-sucedido:', data);
            return data;
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
        }


    },

    async loginToken(token) {
        try {
            const response = await fetch(`${urlBase}/login/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token)
            })
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
        }
    },

}

export default apiLogin;