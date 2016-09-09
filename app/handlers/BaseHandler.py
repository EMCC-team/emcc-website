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
    def user_info(self):
        """Return user identification information.

        Returns:
            A thin, dict-like object containing only identifying
            information of the user associated with the request.

            Use the user_model property to retrieve the full user
            instead.
        """
        user_info = self.auth.get_user_by_session()
        return user_info

    @webapp2.cached_property
    def user(self):
        """Return the full user.

        Returns:
            An instance of the user associated with the request.

            If there is no user associated with the request,
            returns None.
        """
        user, timestamp = \
            self.auth.store.user_model.get_by_auth_token(
                    self.user_info['user_id'],
                    self.user_info['token']) if self.user_info else (None, None)

        return user

    @webapp2.cached_property
    def user_model(self):
        """Return the user model.

        Returns:
            The user model class as set in the
            webapp2_extras.auth.user_model config option.
        """
        return self.auth.store.user_model

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
            # cookie to the response object which stores session
            # information.)
            self.session_store.save_sessions(self.response)
