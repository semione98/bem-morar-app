const urlBase = 'http://localhost:3000';

const apiCadastro = {

    async cadastroPost(cadastroData) {
        try {
            const response = await fetch(`${urlBase}/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cadastroData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log('Cadastro bem-sucedido:', data);
            return data;
        } catch (error) {
            console.error('Erro ao tentar cadastrar:', error);
        }
    }



}

export default apiCadastro;