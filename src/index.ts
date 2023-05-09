import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import queries from "./queries.js";
// const queries = require('./queries')

const app = express();
const port = 8080;

app.use(cors({
    origin: "*"
}));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});
app.get('/test', (request, response) => {
    response.status(200).json('ok');
});
app.get('/users', queries.getUsers);
app.get('/users/:id', queries.getUserById);
app.post('/users', queries.createUser);
app.put('/users/:id', queries.updateUser);
app.delete('/users/:id', queries.deleteUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});


