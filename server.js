const express = require('express');
const cors  = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const FILE_NAME = 'scores.json';

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error("Error, cannot connect with database: ", err.message);
    else console.log("Connected with database.db");
})

db.run(`CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score REAL NOT NULL
)`);

app.get('/scores', (req, res) => {
    const sql = `SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10`;
    db.all(sql, [], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    })
    // if(!fs.existsSync(FILE_NAME)){
    //     return res.json([]);
    // }
    // const fileContent = fs.readFileSync(FILE_NAME, 'utf-8');
    // const scores = JSON.parse(fileContent);
    // scores.sort((a, b) => b.score - a.score);
    // const topScores = scores.slice(0, 10);
    // return res.json(topScores);     // json instead of common text
})

app.post('/scores', (req, res) => {
    const {name, score} = req.body;
    const readyName = name ? name.trim() : "";
    if (!readyName || readyName.length > 25) {
        return res.status(400).json({ error: "name is invalid" });
    }
    db.get(`SELECT score FROM leaderboard WHERE name = ?`, [readyName], (err, row) => {
        if(err) return res.status(500).json({error: err.message});

        if(row){
            if(score>row.score){
                db.run(`UPDATE leaderboard SET score = ? WHERE name = ?`, [score, readyName], (err, row) => {
                    if(err) return res.status(500).json({error: err.message});
                    res.status(200).json({ status: "score updated" });
                })
            } else{
                db.run(`INSERT INTO leaderboard (name, score) VALUES (?, ?)`, [readyName, score], (err, row) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ status: "created registration" });
                })
            }
        }
    })
    // const newScore = req.body;
    // // now we need the current list
    // let scores = [];
    // if(fs.existsSync(FILE_NAME)){
    //     const fileContent = fs.readFileSync(FILE_NAME, 'utf-8')
    //     scores = JSON.parse(fileContent);
    // }
    // scores.push(newScore);
    // const scoresSaved = JSON.stringify(scores);
    // fs.writeFileSync(FILE_NAME, scoresSaved, 'utf-8');
    // return res.status(201).json({status: 'OK'});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

// req -> from client to server
// res -> from server to client
