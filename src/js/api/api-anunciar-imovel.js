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
    }


}

export default apiAnunciarImovel;
