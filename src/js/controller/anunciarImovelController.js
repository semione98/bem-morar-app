import Imovel from '../model/imovel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const anunciarImovelController = {

    async salvarImovel(request, reply) {
        try {
            const user = request.user;
            const imovel = request.body;

            imovel.userId = user.id;
            console.log("console antes de mandar para o modelo");
            const imovelSalvo = await Imovel.salvarImovel(imovel);
            console.log("console depois de mandar para o modelo");
            return reply.status(201).send(imovelSalvo);


        } catch (error) {
            console.error('Erro ao salvar imóvel:', error);
            return reply.status(500).send({ error: 'Erro ao salvar imóvel - anunciarImovelController.' });
        }
    }

}

export default anunciarImovelController;
