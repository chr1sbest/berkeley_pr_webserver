import os
import json
from flask import Flask, Response, jsonify, render_template

# Initialize flask application
application = Flask(__name__,
                    template_folder='frontend',
                    static_folder='frontend')

# Determine `pwd` of this executing file
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

@application.route("/")
def index():
    return render_template('index.html')

@application.route("/rankings")
def rankings():
    path = os.path.join(CURRENT_DIR, 'data_processing/mock_data/ranking_mock.json')
    with open(path, 'r') as data:
        ranking_data = json.load(data)
    return Response(json.dumps(ranking_data),
                    mimetype='application/json')

@application.route("/players/<player_id>")
def player(player_id):
    path = os.path.join(CURRENT_DIR,
                        "data_processing/mock_data/player_{}_mock.json".format(player_id))
    with open(path, 'r') as data:
        player_data = json.load(data)
    return jsonify(**player_data)

@application.route("/players")
def all_players():
    path = os.path.join(CURRENT_DIR, 'data_processing/mock_data/all_players.json')
    with open(path, 'r') as data:
        player_data = json.load(data)
    return Response(json.dumps(player_data),
                    mimetype='application/json')

if __name__ == "__main__":
    application.run()
