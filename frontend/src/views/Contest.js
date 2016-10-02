import React from 'react';
import katex from 'katex';
import { Link } from 'react-router';

import '../fonts/Computer-Modern.css';

import { Container, Row, Columns, Header, Footer, ViewContainer } from '../components/Layout';
import { Button, Input } from '../components/Form';


class Contest extends React.Component {
  constructor(props){
    super(props);
    document.title = 'Contest | EMCC';

    this.showAnswer = this.showAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = {
      question: 0,
      answerTextDisplay: 'none',
      answerButtonDisplay: 'inline',
      nextButtonDisplay: 'none'
    };
    this.state.questions = ['Teemu, Marcus, and Sander are signing documents. If they all work together, they would finish in 6 \
    hours. If only Teemu and Sander work together, the work would be finished in 8 hours. If only Marcus \
    and Sander work together, the work would be finished in 10 hours. How many hours would Sander \
    take to finish signing if he worked alone?'];
    this.state.answers = ['\\frac{120}{7}'];
    this.state.answers = this.state.answers.map((answer) => katex.renderToString(answer));
  }

  showAnswer() {
    this.setState({
      answerTextDisplay: 'inline',
      answerButtonDisplay: 'none',
      nextButtonDisplay: 'inline'
    })
  }

  nextQuestion() {
    this.setState({
      question: (this.state.question + 1) % this.state.questions.length,
      answerTextDisplay: 'none',
      answerButtonDisplay: 'inline',
      nextButtonDisplay: 'none'
    });
  }

  render() {
    return (
      <ViewContainer>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"/>
        <Container>
          <Row>
            <Columns width="ten" offset="one" style={{ fontSize: "1.4em", color: "#333333" }}>
              <div style={{ paddingBottom: "5px", margin: "40px 0 20px", borderBottom: "1px solid #bbb"}}>
                <h2>Contest Information</h2>
              </div>
              <h3>
                Schedule
              </h3>

              <h3>
                Format
              </h3>
              <h4>
                Individual Rounds
              </h4>
              <p>
                The individual round consists of two parts, taken one after
                another. The first part has 25 questions in 20 minutes,
                emphasizing speed. The second part is 10 questions in 45
                minutes, emphasizing accuracy in problem solving. Each
                student's individual score is added to their team score.
              </p>
              <h4>
                Team Round
              </h4>
              <p>
                The team round is a 45 minute round where everybody on the
                team can work together to solve 15 questions. The questions
                will mostly be unrelated to each other, but some of them may
                be strung together by a common theme.
              </p>
              <h4>
                Guts Round
              </h4>
              <p>
                The Guts Round is a live round consisting of 24 questions in
                75 minutes. The questions are given to the teams in sets of
                three. At the beginning of the round, each team will send a
                runner down to one of the scoring tables (spaced evenly
                throughout the contest hall to minimize differences in
                distance) to get the first set of three problems, and bring
                it back to their team. The team then works together for as
                long as they need (within the 75 minutes) to solve these
                three problems. When they're ready, the runner then drops off
                their answers at a scoring table, where they will receive the
                next set of three. At each scoring table, the problems will be
                scored as soon as they are dropped off, and a running tally of
                each team's points and progress will displayed on a projector
                screen at the front of the hall. The point value for each
                problem increases between each set of three.
              </p>

              <h3>
                Rules
              </h3>
              <h4>
                Prohibited Items
              </h4>
              <p>
                Books, notes, calculators, pocket organizers, slide-rules,
                abaci, calculator wrist watches, or any other kind of
                computational aid are prohibited during all parts of the
                competition. The same goes for graph paper, rulers,
                protractors, compasses, or any other drawing aid. Similarly,
                laptops, PDAs, cell phones, or any other electronic
                communication devices are also not allowed.  Any individual
                or team breaking these rules could be disqualified.
              </p>
              <h4>
                Forms of Answers
              </h4>
              <ul>
                <li>Answers need to be simplified and exact unless otherwise
                specified. (So 3.14 will not work for pi, nor will 4/12
                instead of 1/3.)</li>
                <li>No partial credit will be given unless specified otherwise.</li>
                <li>Fractions should be simplified and improper. (For example,
                use 13/4 as opposed to 26/8 or 3 1/4.)</li>
                <li>Radicals should be simplified so that the radicand does
                not contain any fractions nor be divisible by the square of
                any integer greater than one. Denominators should be rationalized.</li>
                <li>Correct mathematical notation should be used.</li>
              </ul>
              <p><strong>All decisions made by the EMCC judges are final.</strong></p>

              <h3>
                Start practicing!
              </h3>
              <p style={{ fontFamily: "'Computer Modern Serif', serif" }}>
                <span style={{ fontWeight: "bold" }}>2016 Team Test, Problem 9</span>
                <br/>
                  {this.state.questions[this.state.question]}
                <br/>
                  <button onClick={this.showAnswer} style={{ display: this.state.answerButtonDisplay, fontSize: ".8em", marginTop: "10px",
                    fontFamily: "Montserrat", fontWeight: "200" }}>Show answer</button>
                  <span style={{ display: this.state.answerTextDisplay }}>Answer: </span>
                  <span style={{ display: this.state.answerTextDisplay }} dangerouslySetInnerHTML={{__html: this.state.answers[this.state.question]}}></span>
                  <button onClick={this.nextQuestion} style={{ display: this.state.nextButtonDisplay, fontSize: ".8em", marginTop: "10px",
                    fontFamily: "Montserrat", fontWeight: "200", marginLeft: "15px" }}>Next question</button>
              </p>
            </Columns>
          </Row>
        </Container>
      </ViewContainer>
    );
  }
}

export default Contest;
