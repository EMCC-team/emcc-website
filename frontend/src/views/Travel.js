import React from 'react';

import { Container, Row, Columns } from '../components/Layout';


class Travel extends React.Component {
  constructor(props) {
    super(props);
    this.props.setTitle('Travel');
  }

  render() {
    return (
      <Container>
        <Row>
          <Columns width="ten" offset="one" style={{ fontSize: "1.4em", color: "#333333" }}>
            <div style={{ paddingBottom: "5px", margin: "40px 0 20px", borderBottom: "1px solid #bbb"}}>
              <h2>Travel</h2>
            </div>

            <h4>Campus Map</h4>
            <p>
              The Phillips Exeter Academy campus address is <a href="https://www.google.com/maps/place/20+Main+St,+Exeter,+NH+03833/@42.9819091,-70.9518363,18z/data=!4m5!3m4!1s0x89e2eef8d5c19a37:0x39626a2a0e785695!8m2!3d42.9812306!4d-70.95181">
              20 Main St</a>.  You can learn more about visiting the campus <a href="http://www.exeter.edu/about-us/our-campus">here</a>.
            </p>

            <h4>Parking</h4>
            <p>
              Visitors to the Academy may park in the semi-circle in front of
              Jeremiah Smith Hall, in front of and behind Admissions (Bissell
              House), in any parking lot with assigned visitor parking, and on
              nearby public streets. The closest parking for EMCC participants
              is the roadside parking on Front Street, Tan Lane, and other
              public streets nearby.
            </p>

            <h4>Transportation</h4>
            <p>
              For contestants, coaches, and parents flying in, please refer to
              Phillips Exeter Academy's "Transportation and Fare" web page for
              information <a href="http://www.exeter.edu/about_us/171_252.aspx">here</a>.
            </p>

            <h4>Lodging</h4>
            <p>
              We now provide 1 night of hotel stay at the local Marriot,
              Fairfield Inn for each traveling team traveling from outside a
              300 mile radius from the school (3 rooms per team). We can also
              contact Flightline, an airport shuttle service to and from
              Boston and Manchester, if you would like; however, you will have
              to cover the expense of the shuttle yourself. If you are
              interested, please email us at <a href="mailto:exetermathclub@gmail.com">
                exetermathclub@gmail.com
              </a> for details.
            </p>
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Travel;
