from google.appengine.ext import ndb
from app.models import Team, User

class Individual(ndb.Model):
    """A model which stores competitors.
    
    Attributes:
        coach: A key referencing a User.
        name: A string containing the full name of the competitor. (e.g. "Tyler Hou")
        paid: A boolean containing whether the competitor was paid for or not.
            Note that if an individual is part of a paid-for team, then the
            individual is also paid for.
        team: A key value referencing the team which the individual is
            a competitor of. (e.g. "Houlin Tuna")
    """
    
    coach = ndb.KeyProperty(kind=User, required=True)
    name = ndb.StringProperty(required=True)
    _paid = ndb.BooleanProperty(default=False)
    team = ndb.KeyProperty(kind=Team, default=None)
    
    @property
    def paid(self):
        return self._paid or (self.team and self.team.paid)
        
    @paid.setter
    def paid(self, value):
        self._paid = value