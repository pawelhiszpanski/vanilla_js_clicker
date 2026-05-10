# 🚀 Professional CPS Clicker (Dual-Stack & SQL)

A high-performance web application designed to test Clicks Per Second (CPS), featuring a robust architecture with interchangeable backends and persistent storage.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Modern Flexbox, UI/UX Animations), Vanilla JavaScript.
* **Backend A (Node.js):** Express.js framework with asynchronous SQLite integration.
* **Backend B (Python):** Flask framework with native SQLite3 management.
* **Database:** SQLite (Relational database for high-integrity score tracking).

## 🌟 Advanced Features
* **Dual-Backend Compatibility:** Both servers share the exact same `database.db` file. You can switch between Node.js and Python without losing data.
* **Anti-Cheat System:** Server-side validation for name length, empty inputs, and "non-human" CPS scores (>30 CPS).
* **Real-Time Accuracy:** Timer logic based on system clock (`Date.now()`) to prevent lag when switching browser tabs.
* **Dynamic Leaderboard:** Top 10 scores are fetched and displayed using optimized SQL queries (`ORDER BY score DESC`).
* **Smart Record System:** The database automatically detects existing players and only updates their score if they beat their personal best.
* **UI/UX Improvements:**
    * **Dark Mode:** Toggleable theme saved in `localStorage`.
    * **In-App Modal:** Modern name entry panel (replaces the browser's native `prompt`).
    * **Countdown:** 3-second animated start sequence.

## 🚀 Installation & Setup

### 1. Database Initialization
The database file `database.db` is automatically created by either server upon its first run.

### 2. Option A: Running the Node.js Server
* Install dependencies: `npm install express cors sqlite3`
* Start the server: `node server.js` (Runs on http://localhost:3000)

### 3. Option B: Running the Python Server
* Install dependencies: `pip install flask flask-cors`
* Start the server: `python server.py` (Runs on http://localhost:5001)

### 4. Client Configuration
Ensure the `fetch()` URLs in your `index.js` point to the correct port (3000 for Node, 5001 for Python).

## 📊 Database Schema
The project uses a relational schema for efficiency:
| Column | Type | Description |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key (Auto-incremented) |
| name | TEXT | Player display name (Unique index) |
| score | REAL | Highest score achieved |
