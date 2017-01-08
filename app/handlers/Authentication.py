import json
import webapp2
from BaseHandler import BaseHandler
from webapp2_extras.auth import InvalidAuthIdError, InvalidPasswordError

def load_from_json_blob(json_blob, response=None):
    try:
        j = json.loads(json_blob)
        return j
    except ValueError as e:
        if response:
            response.status = '400'
            response.write(json.dumps({
                'status': '400',
                'error': 'Bad Request',
                'message': 'Invalid json in body.'
            }))
        return False

def require_fields(dictionary, fields, response=None):
    for field in fields:
        if not dictionary.get(field):
            if response:
                response.status = '422'
                response.write(json.dumps({
                    'status': '422',
                    'error': 'Unprocessable Entity',
                    'message': 'Fields name, email, password are required.'
                }))
            return False
    return True

def validate_email(email, response=None):
    if not email.find('@') > 0:
        if response:
            response.status = '422'
            response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Invalid email.'
            }))
        return False
    return True

def validate_password(password, response=None):
    if len(password) < 8:
        if response:
            response.status = '422'
            response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Password must be at least 8 characters.'
            }))
        return False
    return True


def validate_user(user_info, response):
    j = load_from_json_blob(user_info, response)
    if not j:
        return False

    if not require_fields(j, ['name', 'email', 'password'], response):
        return False

    email = j.get('email')
    if not validate_email(email, response):
        return False

    password = j.get('password')
    if not validate_password(password, response):
        return False

    return j

class RegisterUserHandler(BaseHandler):
    def post(self):
        j = validate_user(self.request.body, self.response)
        if j:
            name = j.get('name')
            email = j.get('email')
            password = j.get('password')
            auth_id = 'own:' + email
            user = self.user_model.create_user(auth_id, email=email, name=name,
                        password_raw=password)
            if user[0]:
                self.response.status = '201'
                self.response.write(json.dumps({
                    'status': '201',
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
                'message': 'A user with that email address already exists.'
            }))

class LoginUserHandler(BaseHandler):
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

        email = j.get('email').lower()
        password = j.get('password')

        if not email or not password:
            self.response.status = '422'
            self.response.write(json.dumps({
                'status': '422',
                'error': 'Unprocessable Entity',
                'message': 'Fields email, password are required.'
            }))
            return
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

class LogoutUserHandler(BaseHandler):
    def post(self):
        self.auth.unset_session()

class CurrentUserHandler(BaseHandler):
    def get(self):
        if (self.user):
            self.response.write(json.dumps(self.user_info))
        else:
            self.response.status = '401'
            self.response.write(json.dumps({
                'status': '401',
                'error': 'Unauthorized',
                'message': 'You are not logged in.',
            }))
