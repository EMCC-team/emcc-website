import webapp2
import yaml

from app.handlers.Authentication import RegisterUserHandler, LoginUserHandler, \
    LogoutUserHandler, CurrentUserHandler
from app.handlers.TeamListHandler import TeamListHandler
from app.handlers.TeamHandler import TeamHandler
from app.handlers.UserListHandler import UserListHandler
from app.handlers.GradeListHandler import GradeListHandler
from app.handlers.GradesOfIndividualListHandler import GradesOfIndividualListHandler

secret_key = yaml.safe_load(open("./config"))['secret-key']
config = {
    'webapp2_extras.auth': {
        'user_model': 'app.models.User.User',
        'user_attributes': ['name']
    },
    'webapp2_extras.sessions': {
        'secret_key': secret_key
    }
}

app = webapp2.WSGIApplication([
    (r'/api/auth/register', RegisterUserHandler),
    (r'/api/auth/login', LoginUserHandler),
    (r'/api/auth/logout', LogoutUserHandler),
    (r'/api/auth/token', CurrentUserHandler),
    webapp2.Route(r'/api/teams/<team_id>', handler=TeamHandler, name='team'),
    (r'/api/teams/', TeamListHandler),
    (r'/api/users/', UserListHandler),
    (r'/api/grades/', GradeListHandler),
    webapp2.Route(r'/api/grades/<individual_id>', handler=GradesOfIndividualListHandler, name='grades')
], debug=True, config=config)
