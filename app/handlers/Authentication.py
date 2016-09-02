import json
from BaseHandler import BaseHandler
from webapp2_extras.auth import InvalidAuthIdError, InvalidPasswordError

class RegisterUserHandler(BaseHandler):
    def post(self):
        name = self.request.get('name')
        email = self.request.get('email')
        password = self.request.get('password')
        confirmed_password = self.request.get('confirmed_password')

        if not name or not email or not password or not confirmed_password:
            self.response.status = '422'
            self.response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Fields name, email, password, and confirmed_password '
                           'are required.'
            }))
            return

        if password != confirmed_password:
            self.response.status = '422'
            self.response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Fields password and confirmed_password do not match.'
            }))
            return

        auth_id = 'own:' + email
        user = self.user_model.create_user(auth_id, name=name, password_raw=password)
        if user[0]:
            self.response.status = '201'
            self.response.write(json.dumps({
                'status': '200',
                'message': 'Created',
                'user': user
            }))
            print auth_id
            return

        self.response.status = '422'
        self.response.write(json.dumps({
            'status': '422',
            'error': 'Unprocessable Entity',
            'message': 'Users with fields ' + str(user[1]) + ' already exist.',
            'data': {
                'fields': user[1]
            }
        }))

class LoginUserHandler(BaseHandler):
    def post(self):
        email = self.request.get('email')
        password = self.request.get('password')
        try:
            u = self.auth.get_user_by_password('own:' + email, password, remember=True)
        except (InvalidAuthIdError, InvalidPasswordError) as e:


