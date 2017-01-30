import React from 'react';
import Link from 'react-router/lib/Link';

import { Container, Row, Columns } from '../components/Layout';

let archive = {
  2017: {
    all: require('../archive/emcc17all.pdf'),
    results: require('../archive/emcc17results.pdf')
  },
  2016: {
    all: require('../archive/emcc16all.pdf'),
    results: require('../archive/emcc16results.pdf')
  },
  2015: {
    all: require('../archive/emcc15all.pdf'),
    results: require('../archive/emcc15results.pdf')
  },
  2014: {
    all: require('../archive/emcc14all.pdf'),
  },
  2013: {
    all: require('../archive/emcc13all.pdf'),
  },
  2012: {
    all: require('../archive/emcc12all.pdf'),
  },
  2011: {
    all: require('../archive/emcc11all.pdf'),
  },
  2010: {
    problems: require('../archive/emcc10all.pdf'),
    solutions: require('../archive/emcc10sol.pdf')
  },
}

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
            <h3>2017</h3>
            <p><a href={`${archive['2017'].all}`}>EMCC 2017 Problems and Solutions</a></p>
            <p><a href={`${archive['2017'].results}`}>EMCC 2017 Results</a></p>
            <h3>2016</h3>
            <p><a href={`${archive['2016'].all}`}>EMCC 2016 Problems and Solutions</a></p>
            <p><a href={`${archive['2016'].results}`}>EMCC 2016 Results</a></p>
            <h3>2015</h3>
            <p><a href={`${archive['2015'].all}`}>EMCC 2015 Problems and Solutions</a></p>
            <p><a href={`${archive['2015'].results}`}>EMCC 2015 Results</a></p>
            <h3>2014</h3>
            <p><a href={`${archive['2014'].all}`}>EMCC 2014 Problems and Solutions</a></p>
            <h3>2013</h3>
            <p><a href={`${archive['2013'].all}`}>EMCC 2013 Problems and Solutions</a></p>
            <h3>2012</h3>
            <p><a href={`${archive['2012'].all}`}>EMCC 2012 Problems and Solutions</a></p>
            <h3>2011</h3>
            <p><a href={`${archive['2011'].all}`}>EMCC 2011 Problems and Solutions</a></p>
            <h3>2010</h3>
            <p><a href={`${archive['2010'].problems}`}>EMCC 2010 Problems</a>&nbsp;
            <a href={`${archive['2010'].solutions}`}>Solutions</a></p>
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Archive;
