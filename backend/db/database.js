const { Pool } = require('pg');

const pool = new Pool({
    user: 'recetario',
    host: 'localhost',
    database: 'recetario_db',
    password: 'recetario123',
    port: 5432,
});

module.exports = pool;