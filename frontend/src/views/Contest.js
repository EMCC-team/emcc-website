import React from 'react';
import Link from 'react-router/lib/Link';

import '../fonts/Computer-Modern.css';

import { Container, Row, Columns } from '../components/Layout';

class Contest extends React.Component {
  constructor(props){
    super(props);
    this.props.setTitle('Contest');
  }

  render() {
    return (
      <Container>
        <Row>
          <Columns width="ten" offset="one" style={{ fontSize: "1.4em", color: "#333333" }}>
            <div style={{ paddingBottom: "5px", margin: "40px 0 20px", borderBottom: "1px solid #bbb"}}>
              <h2>Contest Information</h2>
            </div>
            <h3>
              Tentative Schedule
            </h3>
            <table>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Event</th>
                <th>Location</th>
              </tr>
              <tr>
                <td style={{borderBottom: "none"}}>9:00</td>
                <td style={{borderBottom: "none"}}>10:00</td>
                <td style={{borderBottom: "none"}}>Registration</td>
                <td style={{borderBottom: "none"}}>Academy Building Foyer</td>
              </tr>
              <tr>
                <td colSpan={2}></td>
                <td colSpan={2}><p style={{ fontSize: "0.8em" }}>Teams will be introduced to their proctors at registration.
                If teams arrive late for registration, they should go directly to the opening ceremony, in Assembly Hall.</p></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Light Breakfast</td>
                <td>Academy Building Foyer</td>
              </tr>
              <tr>
                <td style={{borderBottom: "none"}}>10:00</td>
                <td style={{borderBottom: "none"}}>10:30</td>
                <td style={{borderBottom: "none"}}>Opening Ceremony</td>
                <td style={{borderBottom: "none"}}>Assembly Hall (Academy Building)</td>
              </tr>
              <tr>
                <td colSpan={2}></td>
                <td colSpan={2}><p style={{ fontSize: "0.8em" }}>Proctors will lead teams after the opening ceremony directly to
                their classrooms for the individual rounds.</p></td>
              </tr>
              <tr>
                <td>10:30</td>
                <td>12:30</td>
                <td>Team and Individual Rounds</td>
                <td>Classrooms (Academy Building)</td>
              </tr>
              <tr>
                <td>12:30</td>
                <td>1:15</td>
                <td>Lunch</td>
                <td>Academy Building</td>
              </tr>
              <tr>
                <td>1:15</td>
                <td>2:45</td>
                <td>Guts Round</td>
                <td>Assembly Hall</td>
              </tr>
              <tr>
                <td>2:45</td>
                <td>3:00</td>
                <td>Break</td>
                <td>Assembly Hall</td>
              </tr>
              <tr>
                <td>3:00</td>
                <td>3:30</td>
                <td>Awards</td>
                <td>Assembly Hall</td>
              </tr>

            </table>

            <h3>
              Locations
            </h3>
            <p>
              Academy Building, the main hub for the competition, is the main building on campus
              overlooking the lawn next to Front Street. Registration will take place in the foyer of the Academy
              Building, located on the main floor with the marble steps. Breakfast will be available in the foyer as
              well. The opening and closing ceremonies, along with the Guts Round, will take place in the
              Assembly Hall, located on the 2 nd floor of the Academy Building. The individual and team rounds will
              take place in classrooms in the Academy Building. Lunch will also be available for contestants and
              coaches in the classrooms.
            </p>
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
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Contest;
