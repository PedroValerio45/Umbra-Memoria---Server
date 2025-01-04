const express = require('express');
const router = express.Router();
const connection = require('./database');
const cors = require('cors');

// endpoint to find which shards have already been collected by a certain player (UNITY) OR when you stop interacting with a shard (UNITY)
router.get("/checkShardsOnEnterCatacombs", (req, res) =>{
    console.log("shardsEnter query:", req.query); // Log the entire request query
    const id = req.query.generatedID;
    console.log("shardsEnter ID: ", id);

    connection.query('SELECT shard_number FROM shards_collected INNER JOIN unity_users ON shard_user = unity_users.unity_user_id WHERE shards_collected.is_shard_collected = 1 AND unity_users.unity_user_id= ?',
        [id],

        (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send({ error: 'Catacombs entry select query failed' });
        }

        console.log (results);
        res.send({ results });
    });
});

// Endpoint to set all is_shard_found of user to 0, when unity game is opened (UNITY)
router.put('/setFoundZero', (req, res) => {
    console.log("isFound query:", req.query); // Log the entire request query
    const id = req.query.generatedID;
    console.log("isFound ID: ", id);

    connection.query('UPDATE shards_collected JOIN unity_users ON shards_collected.shard_user = unity_users.unity_user_id SET shards_collected.is_shard_found = 0 WHERE shards_collected.is_shard_collected = 0 AND unity_users.unity_user_id = ?;',
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

// Endpoint to when you interact with a shard (UNITY)
router.post('/shardEntry', (req, res) => {
    console.log("isFound query:", req.query); // Log the entire request query
    const idPlayer = req.query.generatedID;    
    const idShard = req.query.shardID;
    console.log("shard enter player ID: ", idPlayer);
    console.log("shard enter shard ID: ", idShard);

    connection.query('INSERT INTO shards_collected (shard_user, shard_number, is_shard_found, is_shard_collected) VALUES (?, ?, 1, 0);',
        [idPlayer, idShard],
        
        (err, results) => {
        if (err) {
            console.error('Error inserting shard found into the database:', err);
            return res.status(500).send({ error: 'Failed to insert shard found ID' });
        }

        console.log (results);
        res.send({ success: true });
    });
});

module.exports = router;