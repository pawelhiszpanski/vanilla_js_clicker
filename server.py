import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

FILE_NAME = 'scores.json'

def get_scores():
    if not os.path.exists(FILE_NAME):   # no file
        return []
    else:
        with open(FILE_NAME, 'r', encoding='utf-8') as file:
            return json.load(file)      # return json type file

@app.route('/hello')
def hello():
    return 'Hello, world!'


@app.route('/scores', methods=['GET'])
def get_leaderboard():
    scores = get_scores()
    scores.sort(key = lambda x: x['score'], reverse=True)
    scores = scores[:10]
    return jsonify(scores)


@app.route('/scores', methods=['POST'])
def save_leaderboard():
    new_score = request.json
    scores = get_scores()
    player_found = False
    for tmp in scores:
        if tmp['name'] == new_score['name']:
            player_found = True
            if tmp['score']< new_score['score']:
                tmp['score'] = new_score['score']
            break

    if not player_found:
        scores.append(new_score)

    with open(FILE_NAME, 'w', encoding='utf-8') as file:
        json.dump(scores, file)

    return jsonify({'status': 'OK'}), 201


if __name__ == '__main__':
    print("Server started")
    app.run(port=5001, debug=True)