from google.appengine.ext import ndb

class SpeedResult(ndb.Model):
    year = ndb.IntegerProperty()
    score = ndb.IntegerProperty()
    tiebreak_points = ndb.IntegerProperty()
    