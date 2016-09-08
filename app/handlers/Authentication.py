import json
import webapp2
from BaseHandler import BaseHandler
from webapp2_extras.auth import InvalidAuthIdError, InvalidPasswordError

class RegisterUserHandler(BaseHandler):
    def post(self):
        name = self.request.get('name')
        email = self.request.get('email').lower()
        password = self.request.get('password')

        if not name or not email or not password:
            self.response.status = '422'
            self.response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Fields name, email, password are required.'
            }))
            return

        if not email.find('@') > 0:
            self.response.status = '422'
            self.response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Invalid email.'
            }))
            return


        auth_id = 'own:' + email
        user = self.user_model.create_user(auth_id, email=email, name=name, password_raw=password)
        if user[0]:
            self.response.status = '201'
            self.response.write(json.dumps({
                'status': '200',
                'message': 'Created',
                'user': {
                    'email': email,
                    'name': name
                }
            }))
            return

        self.response.status = '422'
        self.response.write(json.dumps({
            'status': '422',
            'error': 'Unprocessable Entity',
            'message': 'A user with that email address already exists.',
            'data': {
                'email': email
            }
        }))

class LoginUserHandler(BaseHandler):
    def post(self):
        email = self.request.get('email').lower()
        password = self.request.get('password')
        try:
            u = self.auth.get_user_by_password('own:' + email, password, remember=True)
        except InvalidAuthIdError as e:
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
                'message': 'A user with that email does not exist.',
            }))
            return
        except InvalidPasswordError as e:
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
                'message': 'Incorrect password.',
            }))
