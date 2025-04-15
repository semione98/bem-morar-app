import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import userController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import anunciarImovelController from "../controller/anunciarImovelController.js";


dotenv.config();

const port = process.env.PORT || 3000;
const app = fastify({ logger: true });

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
})

// Rotas de usuário
app.post('/cadastro', userController.cadastroUser);
app.post('/login', userController.loginUser);
app.post('/login/token', userController.getUserById)

// Rotas de imóvel
app.post('/anunciarImovel', { preHandler: authMiddleware }, anunciarImovelController.salvarImovel);
app.get('/imoveis', anunciarImovelController.listarImoveisController);
app.get('/imoveisUser', { preHandler: authMiddleware }, anunciarImovelController.listarImoveisPorUsuario);


app.listen({
    port: port,
})
