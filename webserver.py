import os
import json
import csv
from flask import Flask, Response, request, jsonify, render_template

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
    path = os.path.join(CURRENT_DIR, 'mock_data/ranking_mock.json')
    with open(path, 'r') as data:
        ranking_data = json.load(data)
    return Response(json.dumps(ranking_data),
                    mimetype='application/json')

@application.route("/players/<player_id>")
def player(player_id):
    path = os.path.join(CURRENT_DIR,
                        "mock_data/player_{}_mock.json".format(player_id))
    with open(path, 'r') as data:
        player_data = json.load(data)
    return jsonify(**player_data)

@application.route("/players")
def all_players():
    path = os.path.join(CURRENT_DIR, 'mock_data/all_players.json')
    with open(path, 'r') as data:
        player_data = json.load(data)
    return Response(json.dumps(player_data),
                    mimetype='application/json')

@application.route("/this_is_me", methods=["POST"])
def this_is_me():
    """ Parse form POST data: fb_id and player_id and then
    append this data as a new line to our csv log. """
    fb_id = request.form['facebook_id']
    player_id = request.form['player_id']
    with open('me_log.csv', 'a') as logfile:
        writer = csv.writer(logfile)
        writer.writerow([fb_id, player_id])
        return Response(status=200)

if __name__ == "__main__":
    application.run()
