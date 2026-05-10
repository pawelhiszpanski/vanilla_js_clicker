# import os
# import json
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

FILE_NAME = 'scores.json'

def init_database():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leaderboard
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score REAL NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

init_database()

# def get_scores():
#     if not os.path.exists(FILE_NAME):   # no file
#         return []
#     else:
#         with open(FILE_NAME, 'r', encoding='utf-8') as file:
#             return json.load(file)      # return json type file

@app.route('/hello')
def hello():
    return 'Hello, world!'


@app.route('/scores', methods=['GET'])
def get_leaderboard():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        SELECT name, score
        FROM leaderboard
        ORDER BY score DESC
        LIMIT 10
    ''')

    rows = cursor.fetchall()
    conn.close()
    leaderboard = []
    for row in rows:
        leaderboard.append({'name': row[0], 'score': row[1]})
    return jsonify(leaderboard)

    # scores = get_scores()
    # scores.sort(key = lambda x: x['score'], reverse=True)
    # scores = scores[:10]
    # return jsonify(scores)


@app.route('/scores', methods=['POST'])
def save_leaderboard():
    new_score = request.json
    if len(new_score['name']) == 0:
        return jsonify({'error': 'name cannot be empty'}), 400

    name = new_score.get('name', '').strip()        # deleting white spaces
    score = new_score.get('score')

    if len(name) > 25:
        return jsonify({'error': 'invalid name data'}), 400

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('SELECT score FROM leaderboard WHERE name = ?', (name,))
    result = cursor.fetchone()

    if result:      # player already exist
        old_score = result[0]
        if score > old_score:
            cursor.execute('UPDATE leaderboard SET score = ? WHERE name = ?', (score, name))
    else:           # new player
        cursor.execute('INSERT INTO leaderboard (name, score) VALUES (?, ?)', (name, score))

    conn.commit()
    conn.close()

    # scores = get_scores()
    # player_found = False
    # for tmp in scores:
    #     if tmp['name'] == new_score['name']:
    #         player_found = True
    #         if tmp['score']< new_score['score']:
    #             tmp['score'] = new_score['score']
    #         break
    #
    # if not player_found:
    #     scores.append(new_score)
    #
    # with open(FILE_NAME, 'w', encoding='utf-8') as file:
    #     json.dump(scores, file)

    return jsonify({'status': 'OK'}), 201


if __name__ == '__main__':
    print("Server started")
    app.run(port=5001, debug=True)