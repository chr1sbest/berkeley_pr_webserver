import os
import json
from flask import Flask, Response, jsonify, render_template
from flask.ext.pymongo import PyMongo

# Initialize flask application
application = Flask(__name__,
                    template_folder='frontend',
                    static_folder='frontend')
application.config['MONGO_DBNAME'] = 'production'
mongo = PyMongo(application)

# Determine `pwd` of this executing file
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

@application.route("/")
def index():
    return render_template('index.html')

@application.route("/rankings")
def rankings():
    """ Return raw json from file. """
    path = os.path.join(CURRENT_DIR, 'data_processing/data/current_rankings.json')
    with open(path, 'r') as data:
        ranking_data = json.load(data)
    return Response(json.dumps(ranking_data),
                    mimetype='application/json')

@application.route("/players")
def all_players():
    """ Return raw json from file. """
    path = os.path.join(CURRENT_DIR, 'data_processing/data/all_players.json')
    with open(path, 'r') as data:
        player_data = json.load(data)
    return Response(json.dumps(player_data),
                    mimetype='application/json')

@application.route("/players/<player_id>")
def player(player_id):
    data = mongo.db.users.find_one_or_404({'tag':player_id})
    matches = data['matches']
    player_data = {
        'matches': matches,
        'rank': data['rank'],
        'id': data['tag']
    }
    return Response(json.dumps(player_data),
                    mimetype='application/json')

if __name__ == "__main__":
    application.run()
