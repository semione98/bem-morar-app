import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

dotenv.config();

const port = process.env.PORT || 3000;
const app = fastify({ logger: true });

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
})

app.post('/cadastro', async (request, reply) => {
    const { nome, email, senha, telefone } = request.body;

    if (!nome || !email || !senha || !telefone) {
        return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    // lógica

    return reply.status(201).send({ message: 'Cadastro realizado com sucesso!' });
})


app.listen({
    port: port,
})
