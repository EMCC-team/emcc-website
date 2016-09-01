from google.appengine.ext import ndb
from app.models import Individual

class Result(ndb.Model):
    """A model which stores the results of a round for a single competitor or team.
    
    Attributes:
        correct_answers: A JSON string containing an array which stores whether
            each answer is correct, in order.
            For example, [True, False, False, True] represents answers for four
            questions. Questions 1 and 4 were scored as correct, while questions
            2 and 3 were scored as incorrect.
        score: An integer containing the total score of the result.
        submitted_entity: A key value referencing which entity submitted the
            results. May be a Team or an Individual.
        test: A string containing which round the results are from. (e.g. "Speed")
        tiebreak_score: An integer containing a score which is used for
            resolving tiebreaks.
        year: An integer containing the year of the result. (e.g. 2011)
    """
    
    correct_answers = ndb.JsonProperty()
    score = ndb.IntegerProperty()
    submitted_entity = ndb.KeyProperty(required=True)
    test = ndb.StringProperty(required=True)
    tiebreak_score = ndb.IntegerProperty()
    year = ndb.IntegerProperty(required=True)