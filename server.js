const express = require('express');
const cors  = require('cors');
const fs = require('fs');
const FILE_NAME = 'scores.json';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/scores', (req, res) => {
    if(!fs.existsSync(FILE_NAME)){
        return res.json([]);
    }
    const fileContent = fs.readFileSync(FILE_NAME, 'utf-8');
    const scores = JSON.parse(fileContent);
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 10);
    return res.json(topScores);     // json instead of common text
})

app.post('/scores', (req, res) => {
    const newScore = req.body;
    // now we need the current list
    let scores = [];
    if(fs.existsSync(FILE_NAME)){
        const fileContent = fs.readFileSync(FILE_NAME, 'utf-8')
        scores = JSON.parse(fileContent);
    }
    scores.push(newScore);
    const scoresSaved = JSON.stringify(scores);
    fs.writeFileSync(FILE_NAME, scoresSaved, 'utf-8');
    return res.status(201).json({status: 'OK'});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

// req -> from client to server
// res -> from server to client
