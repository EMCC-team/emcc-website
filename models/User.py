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
    
    @classmethod
    def get_by_auth_token(cls, user_id, token, subject='auth'):
        """Return a tuple containing a user and their token's creation time.
     
        Args:
            user_id: A string containing the user_id of the requesting user.
            token: A string containing the token string to be verified.
        
        Returns:
            tuple: (User, timestamp) or (None, None) if both were not found.
            
        Source: https://blog.abahgat.com/2013/01/07/user-authentication-with-webapp2-on-google-app-engine/
        """
        
        token_key = cls.token_model.get_key(user_id, subject, token)
        user_key = ndb.Key(cls, user_id)
        # Use get_multi() to save a RPC call.
        valid_token, user = ndb.get_multi([token_key, user_key])
        if valid_token and user:
            timestamp = int(time.mktime(valid_token.created.timetuple()))
            return user, timestamp
     
        return None, None

class Coach(User):
    """A model which stores coaches. Coaches are users which can create teams.
    
    Attributes:
        school: A string containing the coach's school. (e.g. "Phillips Exeter Academy")
        phone: A string containing the coach's phone number. (e.g. "3141592653")
    """
    
    school = ndb.StringProperty(required=True)
    phone = ndb.StringProperty(default=None)