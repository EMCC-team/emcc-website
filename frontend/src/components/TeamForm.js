import React from 'react';
import axios from 'axios';

import { Form, Group, Label, ErrorText, Input, Button } from '../components/Form';
import Card from '../components/Card';
import '../fonts/Montserrat.css';

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ padding: "8px" }}>
        <h6 style={{ fontSize: "1.2em", marginBottom: "0px",
                     fontWeight: "500", fontFamily: "Montserrat" }}>Houlin Tuna</h6>
        <span>Tyler Hou, James Lin, Vinjay Vale, Patrick Dickinson</span>
      </div>
    );
  }
}

export { TeamView };
