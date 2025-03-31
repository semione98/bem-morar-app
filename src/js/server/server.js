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





app.listen({
    port: port,
})
