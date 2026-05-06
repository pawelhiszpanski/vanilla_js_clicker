# 🚀 Simple CPS Clicker (Dual Backend Project)

A fast-paced web game to test your Clicks Per Second (CPS). This project was created for educational purposes to learn and compare backend development. It features the exact same server logic implemented in two different environments: Python and Node.js.

## 🛠 Tech Stack
* **Frontend:** HTML5, CSS3 (Animations, Flexbox), Vanilla JavaScript
* **Backend 1 (Node.js):** Node.js, Express, CORS
* **Backend 2 (Python):** Python 3, Flask, Flask-CORS
* **Database:** Local `scores.json` file (shared between both servers)

## 🌟 Key Features
* **Dual Backend Learning:** Run the server using either Python or Node.js - the frontend works identically with both!
* **Countdown Timer:** A built-in 3-second animated countdown before the game starts.
* **Real-time CPS Tracking:** See your clicking speed update live.
* **Global Leaderboard:** The top 10 scores are saved on the server and displayed globally.
* **Personal Best:** Your highest score is saved locally in your browser's storage.

## 🚀 How to Run

You can choose to run either the Node.js server OR the Python server. 

### Option A: Running the Node.js Server
1. Install dependencies:
   `npm install`
2. Start the server:
   `npm start`
   *(Runs on http://localhost:3000)*

### Option B: Running the Python Server
1. Install dependencies:
   `pip install flask flask-cors`
2. Start the server:
   `python server.py`
   *(Runs on http://127.0.0.1:5001 or your configured port)*

### Playing the Game
Once your chosen server is running, open the `index.html` file in any web browser, click "Start Game", and click as fast as you can! 
*(Note: Make sure the `fetch` URLs in your `index.js` point to the correct port depending on which server you started).*
