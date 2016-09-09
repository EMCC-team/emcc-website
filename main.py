import webapp2

from app.handlers.Authentication import RegisterUserHandler, LoginUserHandler, LogoutUserHandler, CurrentUserHandler

config = {
    'webapp2_extras.auth': {
        'user_model': 'app.models.User.User',
        'user_attributes': ['name']
    },
    'webapp2_extras.sessions': {
        'secret_key': '()z-~A7qm!+}W7(c&|RFj{Pk82H|Bgtoe^ncKNf/~0r^;&X-x<*Q,J?7s6Bv6HFq'
    }
}

app = webapp2.WSGIApplication([
    ('/api/auth/register', RegisterUserHandler),
    ('/api/auth/login', LoginUserHandler),
    ('/api/auth/logout', LogoutUserHandler),
    ('/api/auth/token', CurrentUserHandler)
], debug=True, config=config)
