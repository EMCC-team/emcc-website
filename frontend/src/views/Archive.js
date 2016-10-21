import React from 'react';
import Link from 'react-router/lib/Link';

import '../fonts/Computer-Modern.css';

import { Container, Row, Columns } from '../components/Layout';

class Archive extends React.Component {
  constructor(props){
    super(props);
    this.props.setTitle('Archive');
  }

  render() {
    return (
      <Container>
        <Row>
          <Columns width="ten" offset="one" style={{ fontSize: "1.4em", color: "#333333" }}>
            <div style={{ paddingBottom: "5px", margin: "40px 0 20px", borderBottom: "1px solid #bbb"}}>
              <h2>EMCC Archive</h2>
            </div>
            <h3>2016</h3>
            <p><a href="../archive/emcc16all.pdf">EMCC 2016 Problems and Solutions</a></p>
            <p><a href="../archive/emcc16results.pdf">EMCC 2016 Results</a></p>
            <h3>2015</h3>
            <p><a href="../archive/emcc15all.pdf">EMCC 2015 Problems and Solutions</a></p>
            <p><a href="../archive/emcc15results.pdf">EMCC 2015 Results</a></p>
            <h3>2014</h3>
            <p><a href="../archive/emcc14all.pdf">EMCC 2014 Problems and Solutions</a></p>
            <h3>2013</h3>
            <p><a href="../archive/emcc13all.pdf">EMCC 2013 Problems and Solutions</a></p>
            <h3>2012</h3>
            <p><a href="../archive/emcc12all.pdf">EMCC 2012 Problems and Solutions</a></p>
            <h3>2011</h3>
            <p><a href="../archive/emcc11all.pdf">EMCC 2011 Problems and Solutions</a></p>
            <h3>2010</h3>
            <p><a href="../archive/emcc10all.pdf">EMCC 2010 Problems and Solutions</a></p>
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Archive;
