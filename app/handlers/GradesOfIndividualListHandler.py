import json
import webapp2
from google.appengine.ext import ndb
from BaseHandler import BaseHandler
from app.models.Grade import Grade

class GradesOfIndividualListHandler(BaseHandler):
    def get(self, individual_id):
        if not self.user and not self.user.email == 'thou@exeter.edu':
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
            }))
            return
        grades = Grade.query(Grade.year==2017, Grade.individual==ndb.Key(urlsafe=individual_id))
        for grade in grades:
            print grade
        self.response.status = '200'
        self.response.write(json.dumps([grade.serialize() for grade in grades]))
