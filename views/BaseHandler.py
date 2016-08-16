import webapp2
from webapp2_extras import auth, sessions

class BaseHandler(webapp2.RequestHandler):
    @webapp2.cached_property
    def auth(self):
        """Extract an Auth object from the request object.

        Returns:
            An Auth object (webapp2_extras.auth.Auth) containing
            the authorization of the current user.
        """
        return auth.get_auth(request=self.request)

    @webapp2.cached_property
    def user(self):
        """Extract user identification information from the Auth
        object.

        Returns:
            A thin, dict-like object containing only identifying
            information of the logged-in user.

            Use the user_model property to retrieve the full user
            instead.
        """
        user = self.auth.get_user_by_session()
        return user

    @webapp2.cached_property
    def user_model(self):
        """Return the full user model.

        Returns:
            An instance of the user model as set in the
            webapp2_extras.auth.user_model config option.

            If there is no user associated with the request,
            returns None.
        """
        user_model, timestamp = 
            self.auth.store.user_model.get_by_auth_token(
                    self.user['user_id'],
                    self.user['token']) if self.user else (None, None)
        
        return user_model

    @webapp2.cached_property
    def session(self):
        """Return the current session.
        
        This method should only be called within a dispatch method
        (get, post...) so that session_store is not uninitialized.

        Returns:
            A dictionary-like session object.
        """
        return self.session_store.get_session();

    def dispatch(self):
        """Extend the RequestHandler dispatch method with support
        for sessions.

        The dispatch method is called for every request fufilled by a 
        handler. We modify the dispatch method to lookup the session
        each request and add the modified session to the response after
        each request.
        """
        # Get the session store from the request object.
        self.session_store = sessions.get_store(request=self.request)

        # The following is wrapped in a try/finally block because we
        # always want sessions to be stored no matter if an exception
        # is thrown in the try block.
        try:
            # Dispatch the request from the parent class.
            super(BaseHandler, self).dispatch()
        finally:
            # Save all sessions to the response object. (We add a
            # cookie to the response object which store session
            # information.)
            self.session_store.save_sessions(self.response)
