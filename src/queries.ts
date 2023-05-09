import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    // host:`127.0.0.1`,
    // user:`server`,
    // password:`biggly`,
    // database:`recipe`,
    // port:`5432`
    host: process.env.PSQL_HOST,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DB,
    port: process.env.PSQL_PORT
});

// -------- users -------------------------------------------------------------------------

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const createUser = (request, response) => {
    const { email, password } = request.body
  
    pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { email, password } = request.body
  
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [email, password, id],
        (error, results) => {
            if (error) {
            throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    );
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};

// -------- recipes -------------------------------------------------------------------------



const queries = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

export default queries;