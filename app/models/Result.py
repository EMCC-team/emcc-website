from google.appengine.ext import ndb
import Individual

class Result(ndb.Model):
    """A model which stores the results of a round for a single competitor or team.
    
    Attributes:
        test: A string containing which round the results are from. (e.g. "Speed")
        year: An integer containing the year of the result. (e.g. 2011)
        score: An integer containing the total score of the result.
        tiebreak_score: An integer containing a score which is used for
            resolving tiebreaks.
        correct_answers: A JSON string containing an array which stores whether
            each answer is correct, in order.
            For example, [True, False, False, True] represents answers for four
            questions. Questions 1 and 4 were scored as correct, while questions
            2 and 3 were scored as incorrect.
        submitted_entity: A key value referencing which entity submitted the
            results. May be a Team or an Individual.
    """
    
    test = ndb.StringProperty()
    year = ndb.IntegerProperty()
    score = ndb.IntegerProperty()
    tiebreak_score = ndb.IntegerProperty()
    correct_answers = ndb.JsonProperty()
    submitted_entity = ndb.KeyProperty()