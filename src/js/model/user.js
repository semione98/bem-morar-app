import sql from '../server/db.js';

const User = {
    async createUser(userData) {

        const { email, password, name, phone } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await sql`INSERT INTO users (email, password, name, phone) VALUES (${email}, ${hashedPassword}, ${name}, ${phone}) RETURNING *`;
        return result[0];

    },

    async findUserByEmail(email) {
        const result = await sql`SELECT * FROM users WHERE email = ${email}`;
        return result[0];
    },

    async deleteUser(id) {
        const result = await sql`DELETE FROM users WHERE id = ${id} RETURNING *`;
        return result[0];
    }


}

export default User;