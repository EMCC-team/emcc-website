from google.appengine.ext import ndb
from webapp2_extras import security
from webapp2_extras.appengine.auth.models import User as BaseUser
import time

class User(BaseUser):
    """A model which stores users.

    Attributes:
        name: A string containing the users's name. (e.g. "Zuming Feng")
        email: A string containing the users's email. (e.g. "zfeng@exeter.edu")
    """
    name = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)

    def set_password(self, raw_password):
        """Set the password for the current user.

        Args:
            raw_password: A string containing the raw password which will be
                hashed and stored.

        Source: https://blog.abahgat.com/2013/01/07/user-authentication-with-webapp2-on-google-app-engine/
        """

        self.password = security.generate_password_hash(raw_password)

class Coach(User):
    """A model which stores coaches. Coaches are users which can create teams.

    Attributes:
        phone: A string containing the coach's phone number. (e.g. "3141592653")
    """

    phone = ndb.StringProperty(default=None)
