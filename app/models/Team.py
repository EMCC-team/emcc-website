from google.appengine.ext import ndb
from app.models import User

class Team(ndb.Model):
    """A model which stores teams.
    
    Attributes:
        name: A string containing the name of the team. (e.g. "Houlin Tuna")
        school: A string containing which school the team is from. (e.g. "McCall Middle School")
        coach: A key referencing a User.
        paid: A boolean containing whether the team was paid for or not.
    """
    
    coach = ndb.KeyProperty(kind=User, required=True)
    name = ndb.StringProperty(required=True)
    school = ndb.StringProperty(required=True)
    paid = ndb.BooleanProperty(default=False)
    year = ndb.IntegerPropery(required=True)
    combinable = ndb.BooleanProperty(required=True)