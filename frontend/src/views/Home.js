import React from 'react';
import katex from 'katex';
import { Link } from 'react-router';

import '../fonts/Computer-Modern.css';

import { Container, Row, Columns, Header, Footer, ViewContainer } from '../components/Layout';
import { Button, Input } from '../components/Form';


class Home extends React.Component {
  constructor(props){
    super(props);
    document.title = 'Home | EMCC';

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
    console.log(this.state.answers);
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
    let heroStyles = {
      background: //'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ' +
                  //'url("https://www.google.com/gmail/about/images/home-hero_2x.jpg")',
                  'rgba(140, 0, 0, 1)',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '70vh',
      minHeight: 'fit-content',
      color: "#EEEEEE",
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      fontFamily: '\'Montserrat\', sans-serif'
    }
    let headingStyles = {
      fontWeight: '100',
      fontSize: '20rem',
      marginBottom: '4px'
    }
    let subheadingStyles = {
      fontWeight: '300',
      paddingBottom: "10px"
    }

    let docStyles = {
      padding: '50px 0px 0px'
    }
    return (
      <ViewContainer>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"/>
        <div id="hero" style={heroStyles}>
          <Container>
            <h1 style={headingStyles}>EMCC</h1>
            <h3 style={subheadingStyles}>The Exeter Math Club&nbsp;Competition</h3>
            <h5 style={subheadingStyles}>January 21, 2017, Phillips Exeter Academy</h5>
            <div style={{ textAlign: "center", marginBottom: "10vh" }}>
              <Link to="login" className="button" style={{ color: "#EEEEEE", margin: "auto", display: "inline", fontSize: "1.2em",
                fontFamily: "Montserrat", fontWeight: "200", paddingTop: "10px", paddingBottom: "10px", marginRight: "1em" }}>Login</Link>
              <Link to="register" className="button button-primary" style={{ margin: "auto", display: "inline", fontSize: "1.2em",
                fontFamily: "Montserrat", fontWeight: "200", paddingTop: "10px", paddingBottom: "10px" }}>Register</Link>
            </div>
          </Container>
        </div>
        <div style={docStyles}>
          <Container>
            <Row>
              <Columns width="ten" offset="one" style={{ fontSize: "1.4em", color: "#333333" }}>
                <h3>
                  What is EMCC?
                </h3>
                <p>
                  The Exeter Math Club Competition is a middle-school
                  mathematics competition held annually at Phillips Exeter Academy in
                  Exeter, New Hampshire. EMCC provides middle schoolers a event
                  where they can join like-minded peers from a mathematical
                  community spanning the globe.
                </p>
                <p>
                  While designing EMCC, we've taken inspiration from the contests
                  that we ourselves attend and formatted our contest similarly.
                  This means that attending EMCC will not only be an enjoyable
                  experience but will also prepare you for future contests.
                </p>

                <h3>
                  Who can attend?
                </h3>
                <p>
                  Anyone in 8th grade or below. We accept registration
                  as teams of students from the same school or individuals.
                  Teams consist of four people, so we will combine individuals
                  and small teams into teams of four. Competitors aren't limited
                  to just the United States&mdash;in the past, we've hosted students
                  from far away places like China and Illinois.
                </p>

                <h3>
                  How much does it cost?
                </h3>
                <p>
                  Registration fees are $50 for teams and $15 for individuals.
                  We'll arrange a shuttle to and from nearby aiports, but
                  competitors will have to cover the expense themselves.
                  We can't compensate competitors for any travel expenses like
                  gas or bus/train/airplane tickets.
                </p>
                <p>
                  For teams traveling from outside a 300-mile radius, we'll
                  provide three rooms per team for a one night stay at the&nbsp;
                  <a href="http://www.marriott.com/hotels/travel/psmex-fairfield-inn-and-suites-portsmouth-exeter/">
                  Exeter Fairfield Inn</a>.
                </p>

                <h3>
                  What next? Start practicing!
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

                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Register now!
                </h3>
                <div style={{ textAlign: "center" }}>
                  <Link to="login" className="button" style={{ margin: "auto", display: "inline", fontSize: "1.2em",
                    fontFamily: "Montserrat", fontWeight: "200", paddingTop: "10px", paddingBottom: "10px", marginRight: "1em" }}>Login</Link>
                  <Link to="register" className="button button-primary" style={{ margin: "auto", display: "inline", fontSize: "1.2em",
                    fontFamily: "Montserrat", fontWeight: "200", paddingTop: "10px", paddingBottom: "10px" }}>Register</Link>
                </div>
              </Columns>
            </Row>
          </Container>
        </div>
      </ViewContainer>
    );
  }
}

export default Home;
