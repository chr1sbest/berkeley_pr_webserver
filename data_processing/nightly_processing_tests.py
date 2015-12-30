import unittest
import pymongo
import pprint
import get_challonge_data
import nightly_processing


class TestNightlyProcessing(unittest.TestCase):
 

    def test_test(self):
        self.assertTrue(True)

    def test_update_winner_loser(self):
        updated = nightly_processing.update_all_tournament_matches(get_challonge_data.get_tournament_data('sab-gb3champ'))
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
        updated = nightly_processing.update_all_tournament_matches(get_challonge_data.get_tournament_data('sab-gb3champ'))
        for user in users:
            update_registered = nightly_processing.update_registered_user_matches(updated, user)
        self.assertTrue(client['test']['users'].find({'facebook_id': 1}))


if __name__ == '__main__':

    unittest.main()
