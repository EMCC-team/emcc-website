from google.appengine.ext import ndb
from app.models.Team import Team
from app.models.User import User

class Individual(ndb.Model):
    """A model which stores competitors.

    Attributes:
        coach: A key referencing a User.
        name: A string containing the full name of the competitor. (e.g. "Tyler Hou")
        team: A key value referencing the team which the individual is
            a competitor of. (e.g. "Houlin Tuna")
    """

    coach = ndb.KeyProperty(kind=User, required=True)
    name = ndb.StringProperty(required=True)
    team = ndb.KeyProperty(kind=Team, default=None)
    year = ndb.IntegerProperty(required=True)
