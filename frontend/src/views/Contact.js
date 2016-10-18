import React from 'react';
import { Link } from 'react-router';

import '../fonts/Montserrat.css';

import { Container, Row, Columns, Header, Footer } from '../components/Layout';
import { Button, Input } from '../components/Form';
import Card from '../components/Card';

let elizaImage = require('../assets/eliza.jpg');
let yannickImage = require('../assets/yannick.jpg');
class Contact extends React.Component {
  render() {
    let cardStyle = {
      width: "48%",
      flex: "1",
      margin: "6px",
      fontFamily: "Montserrat",
      display: "flex",
      flexDirection: "column"
    };
    let flexStyle = {
      display: "flex",
      flexWrap: "wrap",
    };
    let eliza = {
      backgroundImage: `url(${elizaImage})`,
      backgroundSize: "150%",
      backgroundPosition: "75% 35%",
      backgroundRepeat: "none",
      width: "100%",
      height: "40vw"
    };
    let yannick = {
      backgroundImage: `url(${yannickImage})`,
      backgroundSize: "130%",
      backgroundPosition: "60% 70%",
      backgroundRepeat: "none",
      width: "100%",
      height: "40vw"
    };
    let caption = {
      fontSize: ".85em",
      margin: "5px 8px",
    }
    let light = {
      fontWeight: "200"
    };
    let heavier = {
      fontWeight: "300"
    };
    let email = {
      fontSize: ".75em",
      margin: "5px 0px",
      display: "block",
      float: "right"
    };
    return (
      <Container>
        <Row>
          <Columns width="ten" offset="one" style={{ fontSize: "1.4em", color: "#333333" }}>
            <div style={{ paddingBottom: "5px", margin: "40px 0 20px", borderBottom: "1px solid #bbb"}}>
              <h2>Contact</h2>
            </div>

            <div style={flexStyle}>
                <Card style={{ padding: "0px", ...cardStyle }}>
                  <div style={eliza}></div>
                  <p style={{ flex: "1 0 auto", ...caption }}>
                    <span style={heavier}>Eliza Khokhar, </span>
                    <span style={light}>Tournament&nbsp;Director</span>
                    <br/>
                    <a style={email}href="mailto:ekhokhar@exeter.edu">Email</a>
                  </p>
                </Card>
                <Card style={{ padding: "0px", ...cardStyle }}>
                  <div style={yannick}></div>
                  <p style={{ flex: "1 0 auto", ...caption }}>
                    <span style={heavier}>Yuan "Yannick" Yao, </span>
                    <span style={light}>Tournament&nbsp;Director</span>
                    <br/>
                    <a style={email}href="mailto:yyao@exeter.edu">Email</a>
                  </p>
                </Card>
            </div>
          </Columns>
        </Row>
      </Container>
    );
  }
}

export default Contact;
