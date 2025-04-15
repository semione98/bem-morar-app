import sql from '../server/db.js';

const Imovel = {

    async salvarImovel(imovel) {

        const { titulo, descricao, precoVenda, precoAluguel, condominio, iptu, userId } = imovel;

        // Convertendo os valores para decimal
        const imovelFormatado = {
            titulo,
            descricao,
            precoVenda: precoVenda ? parseFloat(precoVenda) : null,
            precoAluguel: precoAluguel ? parseFloat(precoAluguel) : null,
            condominio: condominio ? parseFloat(condominio) : null,
            iptu: iptu ? parseFloat(iptu) : null,
            userId
        };

        const result = await sql`INSERT INTO imoveis (titulo, descricao, precoVenda, precoAluguel, condominio, iptu, userId) VALUES (${imovelFormatado.titulo}, ${imovelFormatado.descricao}, ${imovelFormatado.precoVenda}, ${imovelFormatado.precoAluguel}, ${imovelFormatado.condominio}, ${imovelFormatado.iptu}, ${imovelFormatado.userId}) RETURNING *`;
        return result[0];
    },

    async listarImoveis() {
        const result = await sql`SELECT * FROM imoveis`;
        return result;
    }

}

export default Imovel;
