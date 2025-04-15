const urlBase = 'http://localhost:3000';

const token = localStorage.getItem('token');

const apiAnunciarImovel = {

    async anunciarImovel(imovel) {
        try {
            const response = await fetch(`${urlBase}/anunciarImovel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(imovel)
            });
            if (!response.ok) {
                const responseError = await response.json();
                throw new Error('Network response was not ok ' + responseError.error);

            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao anunciar imóvel:', error);
        }
    },

    async listarTodosImoveis() {
        try {
            const response = await fetch(`${urlBase}/imoveis`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao listar imóveis:', error);
        }
    },

    async listarImoveisPorUsuario(token) {
        try {
            const response = await fetch(`${urlBase}/imoveisUser`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao listar imóveis por usuário:', error);
        }
    }

}

export default apiAnunciarImovel;
