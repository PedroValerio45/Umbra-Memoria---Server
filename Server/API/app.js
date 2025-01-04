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