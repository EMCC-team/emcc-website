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

    def serialize(self):
        """Serialize a user instance.

        Returns: A dictionary with user information.
        """

        entry = {
            'name': self.name,
            'email': self.email
        }
        return entry

    def deserialize(self, serialized_user):
        """Update a user from a serialized representation.

        Args:
            serialized_user: A dictionary containing fields which will update
                the user instance.
        """

        for field in ['name', 'email']:
            setattr(self, field, serialized_user.get(field))
        if serialized_user.get('password'):
            self.set_password(serialized_user.password())
