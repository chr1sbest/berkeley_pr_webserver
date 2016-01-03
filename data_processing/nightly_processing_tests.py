import unittest
import pymongo
import pprint
from get_challonge_data import get_tournament_data
from nightly_processing import *


class TestNightlyProcessing(unittest.TestCase):
 

    def test_test(self):
        self.assertTrue(True)

    def test_update_winner_loser(self):
        updated = update_all_tournament_matches(get_tournament_data('sab-gb3champ'))
        matches = updated['matches']
        for x in xrange(len(matches)):
            winner_success = isinstance(matches[x]['match']['winner_id'], (str, unicode))
            loser_success = isinstance(matches[x]['match']['loser_id'], (str, unicode))
            self.assertTrue(winner_success)
            self.assertTrue(loser_success)



    def test_update_registered_users_matches(self):
        client = pymongo.MongoClient()
        user_collection = client['test']['users']
        users = [x for x in user_collection.find()]
        updated = update_all_tournament_matches(get_tournament_data('sab-gb3champ'))
        for user in users:
            update_registered = update_registered_user_matches(updated, user)
        self.assertTrue(client['test']['users'].find({'facebook_id': 1}))

    def test_update_player_trueskill(self):
        """ Pull data from 'sab-gb3champ' bracket, with 25 participants
        for each match of the tournament, pick the winner and loser
        update winner/loser rating with winner/loser trueskill rating
        update the dictionary with the new ratings."""

        tournament = get_tournament_data('sab-gb3champ')
        ratings_map = {}
        ratings_map = update_player_trueskill(tournament, ratings_map)
        # Check that the number of players equals the number of entries in ratings map
        self.assertEquals(len(tournament['players']), len(ratings_map))
        # Check first, last values to ensure accuracy for 1 tournament
        highest = ratings_map.get(31900057)
        lowest = ratings_map.get(31900062)
        self.assertEquals(highest, max(ratings_map.values()))
        self.assertEquals(lowest, min(ratings_map.values()))
        

        

if __name__ == '__main__':
    unittest.main()
