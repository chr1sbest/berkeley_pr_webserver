import json
from flask import Flask, jsonify, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/rankings")
def rankings():
    with open('mock_data/ranking_mock.json', 'r') as data:
        ranking_data = json.load(data)
    return jsonify(**ranking_data)


@app.route("/players/<player_id>")
def player(player_id):
    player_file = "mock_data/player_{}_mock.json".format(player_id)
    with open(player_file, 'r') as data:
        player_data = json.load(data)
    return jsonify(**player_data)


if __name__ == "__main__":
    app.run()
