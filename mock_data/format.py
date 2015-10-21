import json
from IPython.core.debugger import Tracer

def format_data(player_ids):
    with open(player_ids) as data:
        players = json.load(data)
    for player in players:
        filename = 'player_' + player + '_mock.json'
        with open(filename, 'w') as outfile:
            json.dump(players[player], outfile)

