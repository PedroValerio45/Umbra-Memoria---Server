const express = require('express');
const router = express.Router();
const connection = require('./database');
// const cors = require('cors');

// endpoint to login in the app
router.post("/appLogin", (req, res) => {
    console.log("app login body:", req.query);
    const id = req.query.generatedID;
    console.log("app login ID: ", id);

    connection.query('SELECT * FROM unity_users WHERE unity_user_id = ?',
        [id], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send({ error: 'App login query failed' });
        }
    
        console.log(results);
    
        // Check if there are any results
        if (results.length === 0) {
            // Return an empty array (or just return results as an empty array)
            res.send({ results: [] });
        } else {
            // Send the unity_user_id of the first result
            res.send({ result: results[0].unity_user_id });
        }
    });
});

// endpoint to check if player found a shard in-game
router.post("/waitForShard", (req, res) =>{
    console.log("wait for shard query:", req.query); // Log the entire request query
    const id = req.query.generatedID;
    console.log("wait for shard ID: ", id);

    connection.query('SELECT shard_number FROM shards_collected WHERE shard_user = ? AND is_shard_found = 1 AND is_shard_collected = 0',
        [id],

        (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send({ error: 'Wait for shard query failed' });
        }

        console.log (results);
        res.send({ results });
    });
});

// endpoint to unlock a shard
router.put("/unlockShard", (req, res) =>{
    console.log("unlock shard query:", req.query); // Log the entire request query
    const id = req.query.generatedID;
    console.log("unlock shard ID: ", id);

    connection.query('UPDATE shards_collected SET is_shard_collected = 1 WHERE is_shard_found = 1 AND shard_user = ?',
        [id],

        (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send({ error: 'Shard unlock select query failed' });
        }

        console.log (results);
        res.send({ results });
    });
});

module.exports = router;