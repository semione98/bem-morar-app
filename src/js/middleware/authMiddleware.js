import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticate(req, reply, done) {
    const token = req.headers.authorization?.split(" ")[1]; // Pega o token do header

    if (!token) {
        return reply.status(401).send({ error: "Acesso negado." });
    }

    try {
        // Decodifica o token e salva os dados do usuário na requisição
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        done();
    } catch (error) {
        return reply.status(401).send({ error: "Token inválido." });
    }
}

export default authenticate;