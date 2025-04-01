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
                throw new Error('Network response was not ok ' + response.statusText);
                return
            }
            const data = await response.json();
            console.log('Login bem-sucedido:', data);
            return data;
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
        }


    }

}

export default apiLogin;