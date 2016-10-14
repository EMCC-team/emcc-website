import json
import webapp2
from BaseHandler import BaseHandler
from app.models import Team

from google.appengine.ext import ndb

error_messages = {}
error_messages['404'] = json.dumps({
    'status': '404',
    'error': 'No such team',
    'message': 'The team with that ID does not exist.'
})

class TeamHandler(BaseHandler):
    def get(self, team_id):
        try:
            team = ndb.Key(urlsafe=team_id)
            if team:
                self.response.write(team.get())
            else:
                self.response.status = '404'
                self.response.write(error_messages['404'])
        except:
            self.response.status = '404'
            self.response.write(error_messages['404'])


    def delete(self, team_id):
        try:
            team = ndb.Key(urlsafe=team_id)
            if team:
                team.delete()
                self.response.status = '200'
                self.response.write(json.dumps({
                    'status': '200',
                    'message': 'Deleted'
                }))
            else:
                self.response.status = '404'
                self.response.write(error_messages['404'])
        except:
            self.response.status = '404'
            self.response.write(error_messages['404'])
