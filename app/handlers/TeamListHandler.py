import json
import webapp2
from BaseHandler import BaseHandler
from app.models.Team import Team
from app.models.Individual import Individual

class TeamListHandler(BaseHandler):
	def get(self):
		if not self.user:
			self.response.status = '401'
			self.response.write(json.dumps({
				'status': '401',
				'error': 'Unauthorized',
			}))
			return
		if self.user.email == 'thou@exeter.edu':
			teams = Team.query(Team.year == 2017, Team.confirmed == True)
		else:
			teams = Team.query(Team.user == self.user.key)
		serialized_teams = [team.serialize() for team in teams]
		self.response.write(json.dumps(serialized_teams))

	def post(self):
		try:
			j = json.loads(self.request.body)
		except ValueError as e:
			self.response.status = '400'
			self.response.write(json.dumps({
				'status': '400',
				'error': 'Bad Request',
				'message': 'Invalid json in body.'
			}))
			return

		if j['confirmed']:
			self.response.write(json.dumps({
				'status': '401',
				'error': 'Unauthorized',
				'message': 'Team signups are closed.'
			}))
			return
		team = Team(year=2017, user=self.user.key)
		team.deserialize(j)
		team.put()

		self.response.status = '201'
		self.response.headers.add('Location', team.key.urlsafe())
		self.response.write(json.dumps({
			'status': '201',
			'message': 'Created',
			'Location': team.key.urlsafe()
		}))
