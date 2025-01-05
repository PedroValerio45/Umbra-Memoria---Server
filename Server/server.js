const express = require('express');
const connection = require('./API/database'); // Import the database connection
// const cors = require('cors');
const catacombs = require('./API/catacombs');
const memorydecoder = require('./API/app');

const app = express();
const port = 3000;

// app.use(cors());  // Allows all origins, for testing purposes
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/catacombs', catacombs); // Everytime a client requests some that begins with /catacombs, it will be foward to catacombs.js
app.use('/app', memorydecoder);

// Endpoint to check if an ID exists (UNITY)
app.get('/checkID', (req, res) => {
    console.log("check body:", req.body); // Log the entire request body
    const id = req.query.generatedID;
    console.log("check ID: ", id);

    connection.query('SELECT * FROM unity_users WHERE unity_user_id = ?',
        [id],

        (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send({ error: 'Database select query failed' });
        }

        console.log (results);
        res.send({ exists: results.length > 0 });
    });
});

// Endpoint to insert a new ID (UNITY)
app.post('/insertID', (req, res) => {
    console.log("insert body:", req.body); // Log the entire request body
    const id = req.query.generatedID;
    console.log("insert ID: ", id);

    connection.query('INSERT INTO unity_users (unity_user_id) VALUES (?)',
        [id],
        
        (err, results) => {
        if (err) {
            console.error('Error inserting into the database:', err);
            return res.status(500).send({ error: 'Failed to insert ID' });
        }

        console.log (results);
        res.send({ success: true });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});