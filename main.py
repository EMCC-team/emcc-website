import webapp2

from app.views.HelloWorldHandler import HelloWorldHandler

app = webapp2.WSGIApplication([
    ('/', HelloWorldHandler),
], debug=True)
