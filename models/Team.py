from google.appengine.ext import ndb
from app.models import Coach

class Team(ndb.Model):
    """A model which stores teams.
    
    Attributes:
        name: A string containing the name of the team. (e.g. "Houlin Tuna")
        school: A string containing which school the team is from. (e.g. "McCall Middle School")
        coach: A key referencing a Coach.
        paid: A boolean containing whether the team was paid for or not.
    """
    
    name = ndb.StringProperty()
    school = ndb.StringProperty()
    coach = ndb.KeyProperty(kind=Coach)
    paid = ndb.BooleanProperty()
