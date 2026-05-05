const GAME_TIME = 3;

const openBtn = document.getElementById('open_leaderboard');
const closeBtn = document.getElementById('close_leaderboard');
const modal = document.getElementById('leaderboard_modal');

openBtn.addEventListener('click', () => {
    modal.classList.remove('modal_hidden');
    openBtn.classList.add('modal_hidden');

    fetchLeaderboard();
})

closeBtn.addEventListener('click', () => {
    modal.classList.add('modal_hidden');
    openBtn.classList.remove('modal_hidden');
})

const bestScoreDisplay = document.querySelector('#best_score_display');
let bestScore = localStorage.getItem('personal_best') || 0;
bestScoreDisplay.textContent = bestScore;

let score = 0;
const clicker = document.getElementById('click_button');
const scoreDisplay = document.getElementById('score_display');

clicker.addEventListener('click', () => {
    score+=1;
    scoreDisplay.textContent = score;
})


let timeLeft = GAME_TIME;
let timer = 0;
const timeDisplay = document.getElementById('time_display');
timeDisplay.textContent = timeLeft.toFixed(2);
const startBtn = document.getElementById('start_button');
const cpsDisplay = document.getElementById('cps_display');

startBtn.addEventListener('click', () => {
    clearInterval(timer);
    score = 0;
    timeLeft = GAME_TIME;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft.toFixed(2);

    startBtn.disabled = true;
    clicker.disabled = false;
    startBtn.textContent = "START GAME";

    timer = setInterval( () => {
        timeLeft-=0.02;

        let timePassed = GAME_TIME-timeLeft;
        if(timePassed > 0){
            cpsDisplay.textContent = (score/timePassed).toFixed(2);
        }

        if(timeLeft <= 0){
            clearInterval(timer);
            const playerName = prompt('Type your name:');
            if(playerName){
                const post_data = {
                    name: playerName,
                    score: score
                }
                console.log('Prepared data to send:', post_data);
                saveScore(post_data);
            }
            if(score>bestScore){
                bestScore = score;
                localStorage.setItem('personal_best', bestScore);
                bestScoreDisplay.textContent = bestScore;
            }
            clicker.disabled=true;
            startBtn.disabled=false;
            startBtn.textContent="RESTART";
        }
        timeDisplay.textContent = Math.max(0, timeLeft).toFixed(2);
    }, 20);
})


async function fetchLeaderboard(){
    try{
        const response = await fetch('http://127.0.0.1:5001/scores');
        if(!response.ok){
            throw new Error('Server Error' + response.status);
        }
        const data = await response.json();
        //console.log(data);
        const leaderList = document.getElementById('leaderboard_list');
        leaderList.innerHTML = '';      // clearing old view
        data.forEach((user) => {
            const listItem = document.createElement('li');

            const nameSpan = document.createElement('span');
            nameSpan.textContent = user.name;
            nameSpan.classList.add('player_name');

            const scoreSpan = document.createElement('span');
            scoreSpan.textContent = `${user.score} points`;
            scoreSpan.classList.add('player_score');

            listItem.appendChild(nameSpan);
            listItem.appendChild(scoreSpan);
            leaderList.appendChild(listItem);
        })
    }
    catch(error){
        console.error('ERR: ', error);
    }
}

async function saveScore(scoreData){
    try{
        const post_options ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(scoreData)
        };

        const response = await fetch('http://127.0.0.1:5001/scores', post_options);
        if(!response.ok){
            throw new Error('Server Error' + response.status);
        }
        console.log('Data saved properly!', post_options.body);
    }
    catch(error){
        console.error('ERR: ', error);
    }
}