import sql from '../server/db.js';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userController = {

    async cadastroUser(request, reply) {
        try {
            const { nome, email, senha, telefone } = request.body;

            const userExists = await User.findUserByEmail(email);
            if (userExists) {
                return reply.status(400).send({ error: 'Usuário já cadastrado.' });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);
            const cadastroData = {
                email,
                password: hashedPassword,
                name: nome,
                phone: telefone
            };

            const newUser = await User.createUser(cadastroData);

            return reply.status(201).send({ message: 'Cadastro realizado com sucesso!', user: newUser });
        } catch (error) {
            console.error('Erro ao tentar cadastrar:', error);
            return reply.status(500).send({ error: 'Erro ao tentar cadastrar o usuário - userController.' });
        }
    },

    async loginUser(request, reply) {
        try {
            const { email, senha } = request.body;

            const user = await User.findUserByEmail(email);
            if (!user) {
                return reply.status(401).send({ error: 'Usuário não encontrado.' });
            }

            const comparaSenha = await bcrypt.compare(senha, user.password);
            if (!comparaSenha) {
                return reply.status(401).send({ error: 'Senha incorreta.' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return reply.status(200).send({ message: 'Login realizado com sucesso!', token });
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            return reply.status(500).send({ error: 'Erro ao tentar fazer login - userController.' });
        }
    },

};

export default userController;