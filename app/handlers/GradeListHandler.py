import json
import webapp2
from BaseHandler import BaseHandler
from app.models.Grade import Grade

class GradeListHandler(BaseHandler):
    def post(self):
        if not self.user and not self.user.email == 'thou@exeter.edu':
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
            }))
            return

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

        grade = Grade(year=2017)
        try:
            grade.deserialize(j)
        except ValueError as e:
            self.response.status = '400'
            self.repsonse.write(json.dumps({
                'status': '400',
                'error': 'Bad Request',
                'message': str(e)
            }))

    def get(self):
        if not self.user and not self.user.email == 'thou@exeter.edu':
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
            }))
            return

        grades = Grade.query(Grade.year==2017)
        self.response.status = '200'
        self.response.write(json.dumps([grade.serialize() for grade in grades]))
