import json
import webapp2
from BaseHandler import BaseHandler
from app.models import Team

from google.appengine.ext import ndb
from google.net.proto.ProtocolBuffer import ProtocolBufferDecodeError

error_messages = {}
error_messages['404'] = json.dumps({
    'status': '404',
    'error': 'No such team',
    'message': 'The team with that ID does not exist.'
})

class TeamHandler(BaseHandler):
    def get(self, team_id):
        try:
            team = ndb.Key(urlsafe=team_id).get()
            if not team:
                self.response.status = '404'
                self.response.write(error_messages['404'])
                return
            self.response.write(team.serialize())
        except ProtocolBufferDecodeError:
            self.response.status = '404'
            self.response.write(error_messages['404'])

    def put(self, team_id):
        try:
            team = ndb.Key(urlsafe=team_id).get()
            if not team:
                self.response.status = '404'
                self.response.write(error_messages['404'])
                return
            j = json.loads(self.request.body)
            if j['confirmed'] == True and True != team.confirmed:
                self.response.write(json.dumps({
    				'status': '401',
    				'error': 'Unauthorized',
    				'message': 'Team signups are closed.'
    			}))
                return
            team.deserialize(j)
            self.response.status = '204'
        except ValueError as e:
            self.response.status = '400'
            self.response.write(json.dumps({
                'status': '400',
                'error': 'Bad Request',
                'message': 'Invalid json in body.'
            }))
            return
        except ProtocolBufferDecodeError:
            self.response.status = '404'
            self.response.write(error_messages['404'])

    def delete(self, team_id):
        try:
            team = ndb.Key(urlsafe=team_id)
            if not team:
                self.response.status = '404'
                self.response.write(error_messages['404'])
            team.delete()
            self.response.status = '204'
        except ProtocolBufferDecodeError:
            self.response.status = '404'
            self.response.write(error_messages['404'])
