# 🚀 Simple CPS Clicker with Python Backend

A full-stack web application designed to test your clicking speed (Clicks Per Second). The project features a modern, responsive frontend and a custom Python-based backend to manage the global leaderboard.

## 🛠 Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox, Modal windows), Vanilla JavaScript (ES6+).
* **Backend:** Python 3, Flask framework, Flask-CORS.
* **Database:** JSON-based persistent storage.

## 🌟 Features

* **Real-time CPS Calculation:** Track your speed as you click.
* **Personal Best:** Saves your highest score in the browser's localStorage.
* **Global Leaderboard:** Syncs your results with a Python server to see the Top 10 players.
* **Persistent Storage:** Scores are saved in a `scores.json` file on the server.
* **Responsive Design:** Clean and simple UI that works on various screen sizes.

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have **Python 3** installed on your machine.

### 2. Installation
Clone this repository or download the source code, then install the required Python packages:
`pip install flask flask-cors`

### 3. Running the Application

1. **Start the Backend Server:**
   Navigate to the project folder and run:
   `python server.py`
   The server will start on `http://127.0.0.1:5001`.

2. **Launch the Frontend:**
   Open `index.html` in your favorite web browser.

## 📁 Project Structure

* `index.html` - The main structure of the game.
* `style.css` - Visual styling and layout.
* `index.js` - Game logic and communication with the API.
* `server.py` - Flask server handling GET and POST requests.
* `scores.json` - Data file where the leaderboard is stored.

## 📝 License
This project is open-source and available under the MIT License.
