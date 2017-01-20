import json
import webapp2
from BaseHandler import BaseHandler
from app.models.User import User
from app.models.Team import Team

class UserListHandler(BaseHandler):
    def get(self):
        if not self.user:
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
            }))
            return
        if self.user.email == 'thou@exeter.edu':
            teams = Team.query(Team.year == 2017, Team.confirmed==True)
            user_map = {}
            for team in teams:
                if user_map.get(team.user.id()):
                    user_map[team.user.id()] += [team.key.urlsafe()]
                else:
                    user_map[team.user.id()] = [team.key.urlsafe()]
            users = {team.user for team in teams}
            users = [user.get() for user in users]
            users = [{
                "name": user.name,
                "email": user.email,
                "teams": user_map[user.key.id()]
            } for user in users];
            self.response.write(json.dumps(users))
            return
        self.response.status = '401'
        self.response.write(json.dumps({
            'status': '401',
            'error': 'Unauthorized',
        }))
        return
