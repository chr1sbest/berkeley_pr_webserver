import json

def format_data(player_ids):
     """ Format data with player_ids into separate player_id files that can be read
    :param json file with structure matches list : {tournament:'tournament name', opponent: 'opponent', outc    ome: 'win/lose'}
    :return none; writes files to mock_data folder
    """
    with open(player_ids) as data:
        players = json.load(data)   
    for player in players:
        formatted = {}
        formatted['matches'] = players[player]
        filename = 'player_' + player + '_mock.json'
        with open(filename, 'w') as outfile:
            json.dump(formatted, outfile)
            
        
