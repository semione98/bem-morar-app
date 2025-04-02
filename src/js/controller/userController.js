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
            const { email, password } = request.body;

            const user = await User.findUserByEmail(email);
            if (!user) {
                return reply.status(401).send({ error: 'Usuário não encontrado.' });
            }

            const comparaSenha = await bcrypt.compare(password, user.password);
            if (!comparaSenha) {
                return reply.status(401).send({ error: 'Senha incorreta.' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return reply.status(200).send({ user: { id: user.id, name: user.name, email: user.email }, message: 'Login realizado com sucesso!', token });
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            return reply.status(500).send({ error: 'Erro ao tentar fazer login - userController.' });
        }
    },

    async getUserById(request, reply) {
        try {
            const { token } = request.body;
            console.log(token)
            const decodedToken = jwt.decode(token);
            const id = decodedToken.id;
            console.log(id)
            const user = await User.findUserById(id);
            if (!user) {
                return reply.status(404).send({ error: 'Usuário não encontrado.' });
            }
            return reply.status(200).send(user);
        } catch (error) {
            console.error('Erro ao tentar encontrar usuário:', error);
            return reply.status(500).send({ error: 'Erro ao tentar encontrar usuário - userController.' });
        }
    },

};

export default userController;