import json
import webapp2
from BaseHandler import BaseHandler
from app.models import Team

class TeamHandler(BaseHandler):
	def get(self, team_id):
		team = Team.get_by_id(team_id)
		if(team):
			self.response.write(json.dumps(team))
		else:
            self.response.status = '404'
            self.response.write(json.dumps({
                'status': '404',
                'error': 'No such team',
                'message': 'The team with that ID does not exist.'
            }))