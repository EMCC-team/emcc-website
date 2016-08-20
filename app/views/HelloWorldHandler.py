import webapp2
import pydoc
from webapp2_extras.appengine.auth.models import User

class HelloWorldHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(pydoc.plain(pydoc.render_doc(User, "Help on %s")))
