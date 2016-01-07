"""
Query Challonge for tournament data and upsert to Mongo.
"""
import pymongo
from requests import get
from config import CHALLONGE_KEY

CLIENT = pymongo.MongoClient()

#TODO: Remove unneccesary data, include link to challonge page and tourney name to each match in matches
def get_tournament_data(tournament_id):
    """ Query challonge API for player and match details.

    :param tournament_id String: Challonge tournament ID
    :returns list, list:
    """
    url = 'https://api.challonge.com/v1/tournaments/{}/{}.json'
    params = {'api_key': CHALLONGE_KEY, 'tournament_id': tournament_id}
    matches = get(url.format(tournament_id, 'matches'), params=params)
    players = get(url.format(tournament_id, 'participants'), params=params)

    return {
        #TODO regex to only get name/id for player and winner/loser id for matches
        'players': players.json(),
        'matches': matches.json(),
        'tournament_id': tournament_id,
        'created_at': players.json()[-1]['participant']['created_at']
    }

def upload_tournament_data(data, client=CLIENT):
    """ Insert tournament data into Mongo."""
    tournaments_collection = client['production']['tournaments']
    tournaments_collection.insert(data)

def upload_test_data(data, client=CLIENT):
    """ Upload test data into test db for testing purposes."""
    test_collection = client['test']['tournaments']
    test_collection.insert(data)
