import webapp2
from app.models import Coach

class HelloWorldHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(help(Coach))
