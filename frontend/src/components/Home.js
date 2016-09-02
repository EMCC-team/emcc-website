import React from 'react';

import '../fonts/montserrat/Montserrat-Regular.ttf'
import '../css/Home.css'

import { Container, Row, Columns } from './Layout'


class Home extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    let heroStyles = {
      padding: '60px 0px',
      backgroundImage: 'url(https://www.google.com/gmail/about/images/home-hero_2x.jpg)',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      maxWidth: '100%',
      height: '70%',
      color: "#EEEEEE"
    }
    return (
      <div style={{ height: "100%" }}>
        <div id="hero" style={heroStyles}>
          <Container>
            <h2>Hello</h2>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;