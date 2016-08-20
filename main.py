import webapp2

from app.views.HelloWorldHandler import HelloWorldHandler

config = {
  'webapp2_extras.auth': {
    'user_model': 'models.User',
    'user_attributes': ['name']
  },
  'webapp2_extras.sessions': {
    'secret_key': '()z-~A7qm!+}W7(c&|RFj{Pk82H|Bgtoe^ncKNf/~0r^;&X-x<*Q,J?7s6Bv6HFq'
  }
}

app = webapp2.WSGIApplication([
    ('/', HelloWorldHandler),
], debug=True, config=config)
