from google.appengine.ext import ndb

class Individual(ndb.Model):
    name = ndb.StringModel()