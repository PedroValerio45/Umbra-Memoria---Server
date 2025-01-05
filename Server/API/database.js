const mysql = require('mysql2');

/* const connection = mysql.createConnection({
    host: 'yoefh.h.filess.io',
    user: 'umbramemoria_seemslift',
    port: '3307',
    password: '6a81f0b380f58e58c0394c4900cec5958131ee6e',
    database: 'umbramemoria_seemslift'
}); */

const connection = mysql.createConnection({
    host: 'localhost', // Use this hostname
    user: 'root', // Default in mySQL Workbench
    password: 'YOUR_PASSWORD', // Ajust the password to your own
    database: 'umbramemoria' // Use this database name
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = connection;