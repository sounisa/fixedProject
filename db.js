import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool ({
    user: 'sounisaa',
    password: '',
    port: 5432,
    host: 'localhost',
    database: 'database'
});

export {pool};