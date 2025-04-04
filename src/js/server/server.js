import fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import userController from "../controller/userController.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = fastify({ logger: true });

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
})

app.post('/cadastro', userController.cadastroUser);
app.post('/login', userController.loginUser);
app.post('/login/token', userController.getUserById)


app.listen({
    port: port,
})
