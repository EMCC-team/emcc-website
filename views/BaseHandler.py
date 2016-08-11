import webapp2
from webapp2_extras import auth, sessions

class BaseHandler(webapp2.RequestHandler):
    @webapp2.cached_property
    def session(self):
        """Return the current session.
        
        This method should only be called within a dispatch method
        (get, post...) so that session_store is not uninitialized.
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
