import React from 'react';

import '../fonts/Open-Sans.css';
import '../fonts/Montserrat.css';

import { Container, Row, Columns } from './Layout';
import { Button, Input } from './Form';


class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let heroStyles = {
      background: //'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ' +
                  //'url("https://www.google.com/gmail/about/images/home-hero_2x.jpg")',
                  'rgba(140, 0, 0, 1)',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '60vh',
      minHeight: 'fit-content',
      color: "#EEEEEE",
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
    }
    let headingStyles = {
      fontWeight: '100',
      fontSize: '8rem',
      marginBottom: '4px'
    }
    let subheadingStyles = {
      fontWeight: '300'
    }

    let docStyles = {
      padding: '50px 0px 0px',
      fontFamily: "'Open Sans', sans-serif"
    }
    return (
      <div style={{ height: "100%", fontFamily: '\'Montserrat\', sans-serif' }}>
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css"/>
        <div id="hero" style={heroStyles}>
          <Container style={{ backdropFilter: "blusdr(5px)", filter: "brightness(200%)" }}>
            <h1 style={headingStyles}>EMCC</h1>
            <h3 style={subheadingStyles}>The Exeter Math Club&nbsp;Competition</h3>
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
                  that we ourselves attend. This means that attending EMCC will
                  prepare you for future contests.
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
                  We also can't compensate competitors for any travel.
                </p>
                <p>
                  For teams traveling from outside a 300-mile radius, we'll
                  provide three rooms per team for a one night stay at the&nbsp;
                  <a href="http://www.marriott.com/hotels/travel/psmex-fairfield-inn-and-suites-portsmouth-exeter/">
                  Exeter Fairfield Inn</a>.
                </p>

                <h3>
                  Start solving problems!
                </h3>
                <p style={{ fontFamily: "'Computer Modern Serif', serif" }}>
                  <span style={{ fontWeight: "bold" }}>2016 Team Test, Problem 9</span>
                  <br/>
                  Teemu, Marcus, and Sander are signing documents. If they all work together, they would finish in 6
                  hours. If only Teemu and Sander work together, the work would be finished in 8 hours. If only Marcus
                  and Sander work together, the work would be finished in 10 hours. How many hours would Sander
                  take to finish signing if he worked alone?
                  <br/>
                  <Input placeholder="Answer" style={{ marginTop: "5px", fontSize: "inherit" }}></Input>
                </p>

                <div style={{ textAlign: "center" }}>
                  <a href="register" className="button button-primary" style={{ margin: "auto", display: "inline", fontSize: "1.2em",
                    fontFamily: "Montserrat", fontWeight: "200", paddingTop: "10px", paddingBottom: "10px" }}>Register</a>
                </div>
              </Columns>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
