from google.appengine.ext import ndb
from webapp2_extras.appengine.auth.models import User

class Coach(User):
    """A model which stores coaches. Coaches are users which can create teams.
    
    Attributes:
        coach_id: 
        name: The coach's name. (e.g. Zuming Feng)
        school: The school that the coach comes from
    
    """
    
    coach_id = ndb.StringProperty() # id is taken
    name = ndb.StringProperty()
    school = ndb.StringProperty()
    email = ndb.StringProperty()
    phone = ndb.StringProperty()