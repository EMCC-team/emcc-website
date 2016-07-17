from google.appengine.ext import ndb
from app.models import Team

class Individual(ndb.Model):
    """A model which stores competitors.
    
    Attributes:
        name: A string containing the full name of the competitor. (e.g. "Tyler Hou")
        team: A key value referencing the team which the individual is
            a competitor of. (e.g. "Houlin Tuna")
        paid: A boolean containing whether the competitor was paid for or not.
            Note that if an individual is part of a paid-for team, then the
            individual is also paid for.
    """
    
    name = ndb.StringProperty()
    team = ndb.KeyProperty(kind=Team)
    _paid = ndb.BooleanProperty()
    
    @property
    def paid(self):
        return self._paid or (self.team and self.team.paid)
        
    @paid.setter
    def paid(self, value):
        self._paid = value