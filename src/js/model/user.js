import sql from '../server/db.js';

const User = {
    async createUser(userData) {

        const { email, password, name, phone } = userData;
        const result = await sql`INSERT INTO usuarios (email, password, name, phone) VALUES (${email}, ${password}, ${name}, ${phone}) RETURNING *`;
        return result[0];

    },

    async findUserByEmail(email) {
        const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
        if (result.length === 0) {
            return null;
        }
        return result[0];
    },

    async deleteUser(id) {
        const result = await sql`DELETE FROM usuarios WHERE id = ${id} RETURNING *`;
        return result[0];
    }


}

export default User;