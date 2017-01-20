from google.appengine.ext import ndb
from app.models.Individual import Individual

class Grade(ndb.Model):
    round = ndb.StringProperty(required=True)
    subround = ndb.IntegerProperty()
    member = ndb.KeyProperty(kind=Individual, required=True, index=True)
    year = ndb.IntegerProperty(required=True)
    grader = ndb.StringProperty(required=True)
    grades = ndb.JsonProperty(required=True)

    def serialize(self):
        entry = {
            'id': self.key.urlsafe(),
            'round': self.round,
            'subround': self.subround,
            'member': self.member,
            'year': self.year,
            'grader': self.grader,
            'grades': self.grades
        }
        return entry

    def deserialize(self, grade):
        """Updates a team with a dictionary input.

        Throws:
            KeyError if a required field is not present.
        """
        self.round = grade['round']
        if grade['round'] == 'Guts':
            self.subround = grade['subround']
        self.member = grade['member']
        self.grader = grade['grader']
        self.grades = grade['grades']
        self.put()
