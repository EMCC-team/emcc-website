import webapp2

from app.handlers.Authentication import RegisterUserHandler, LoginUserHandler, LogoutUserHandler, CurrentUserHandler
from app.handlers.TeamListHandler import TeamListHandler
from app.handlers.TeamHandler import TeamHandler

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
    (r'/api/auth/register', RegisterUserHandler),
    (r'/api/auth/login', LoginUserHandler),
    (r'/api/auth/logout', LogoutUserHandler),
    (r'/api/auth/token', CurrentUserHandler),
    webapp2.Route(r'/api/teams/<team_id>', handler=TeamHandler, name='team'),
    (r'/api/teams/', TeamListHandler),
], debug=True, config=config)
