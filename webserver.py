import json
from flask import Flask, jsonify, render_template
application = Flask(__name__,
                    template_folder='frontend',
                    static_folder='frontend')

@application.route("/")
def hello():
    return render_template('index.html')


@application.route("/rankings")
def rankings():
    with open('mock_data/ranking_mock.json', 'r') as data:
        ranking_data = json.load(data)
    return jsonify(**ranking_data)


@application.route("/players/<player_id>")
def player(player_id):
    player_file = "mock_data/player_{}_mock.json".format(player_id)
    with open(player_file, 'r') as data:
        player_data = json.load(data)
    return jsonify(**player_data)


if __name__ == "__main__":
    application.run()
