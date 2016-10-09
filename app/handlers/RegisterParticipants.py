import json
import webapp2
from BaseHandler import BaseHandler
from app.models import Team, Individual

class RegisterParticipantsHandler(BaseHandler):
	def post(self):
		try:
			j = json.loads(self.request.body)
		except ValueError as e:
			self.response.write(json.dumps({
					'status': '400',
					'error': 'Bad Request',
					'message': 'Invalid json in body.'
				}))
			return

		teamname = j.get('teamname');
		members = j.get('members');
		combinable = j.get('combinable');
		team = Team(name=teamname,
				combinable=combinable,
				year=2017,
				coach=this.state.user.name);
		team.put();

		for membername in members:
			member = Individual(name=membername,
						coach=this.state.user.name,
						team=team,
						year=2017);
			member.put();