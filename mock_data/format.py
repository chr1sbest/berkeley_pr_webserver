import json
from IPython.core.debugger import Tracer

def format_data(player_ids):
    playerList = []
    with open(player_ids) as data:
        players = json.load(data)
    for player in players:
        filename = 'player_' + player + '_mock.json'
        with open(filename, 'w') as outfile:
            json.dump(players[player], outfile)
    for player in players:
        playerList.append(player)
    with open('all_players.json', 'w') as result:
        json.dump(playerList, result)
