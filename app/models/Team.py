from google.appengine.ext import ndb
from app.models.Individual import Individual

class Team(ndb.Model):
    """A model which stores teams.

    Attributes:
        name: A string containing the name of the team. (e.g. "Houlin Tuna")
        school: A string containing which school the team is from. (e.g. "McCall Middle School")
        user: A key referencing a User.
        paid: A boolean containing whether the team was paid for or not.
        year: An integer containing the team's year of competition.
        deletable: A boolean specifying whether the registrant can delete
            the team.
    """

    user = ndb.KeyProperty(kind='User', required=True)
    name = ndb.StringProperty(required=True)
    year = ndb.IntegerProperty(required=True)
    school = ndb.StringProperty(required=True)
    combinable = ndb.BooleanProperty(required=True)
    confirmed = ndb.BooleanProperty(required=True)
    assigned_id = ndb.StringProperty()

    deletable = ndb.BooleanProperty(default=False)

    def serialize(self):
        """Serializes the team object into a dictionary.

        Returns: A dictionary containing fields (str) id (a urlsafe Key),
        (str) name, ([str]) members, (bool) combinable, (bool) deletable,
        and (bool) confirmed.
        """
        MAX_MEMBERS_LENGTH = 4
        members = Individual.query(Individual.team == self.key)
        serialized_members = sorted([{
            'name': member.name,
            'id': member.key.urlsafe(),
            'assigned_id': member.assigned_id
        } for member in members], key=lambda x: x['assigned_id'])
        serialized_members += [""] * (MAX_MEMBERS_LENGTH-len(serialized_members))
        entry = {
            'id': self.key.urlsafe(),
            'name': self.name,
            'school': self.school,
            'members': serialized_members,
            'combinable': self.combinable,
            'deletable': self.deletable,
            'confirmed': self.confirmed,
            'assigned_id': self.assigned_id,
            'user': self.user.urlsafe()
        }
        return entry

    def deserialize(self, team):
        """Updates a team with a dictionary input.

        Throws:
            KeyError if a required field is not present.
        """
        self.name = team['name']
        self.school = team['school']
        self.combinable = team['combinable']
        self.confirmed = team['confirmed']
        if team.get('assigned_id'):
            self.assigned_id = team['assigned_id']
        if team.get('members'):
            self.set_members(team['members'])
        self.put()

    def set_members(self, new_members):
        current_members = Individual.query(Individual.team == self.key)
        for member in current_members:
            member.key.delete()
        for index, member in enumerate(new_members):
            if member:
                Individual(name=member,
                    user=self.user,
                    team=self.key,
                    year=2017,
                    assigned_id=str(index+1)).put()
        self.put()
