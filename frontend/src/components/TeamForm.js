import React from 'react';
import axios from 'axios';

import { Form, Group, Label, ErrorText, Input, Button } from '../components/Form';
import Card from '../components/Card';
import '../fonts/Montserrat.css';

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.updateCombinable = this.updateCombinable.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateCombinable = this.updateCombinable.bind(this);
    this.expand = this.expand.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);

    let { members, expanded, teamname, combinable } = this.props
    this.state = { expanded: false, members, expanded, teamname, combinable };

    if (!this.state.members) {
      this.state.members = ["", "", "", ""];
    }
    this.state._members = this.state.members.slice();
    if (!this.state.teamname) {
      this.state.teamname = "";
    }
    this.state._teamname = this.state.teamname;
    if (!this.state.combinable) {
      this.state.combinable = true;
    }
    this.state._combinable = this.state.combinable;
  }

  componentWillMount() {
    this.state.price = this.props.price(this.props.members, this.props.combinable);
    this.props.save(this);
  }

  updateMember(memberIndex) {
    return (e) => {
      e.preventDefault();
      let _members = this.state._members;
      _members[memberIndex] = e.target.value;
      this.setState({ _members });
    }
  }

  updateName(e) {
    e.preventDefault();
    this.setState({ _teamname: e.target.value });
  }

  updateCombinable(e) {
    e.preventDefault();
    this.setState({ _combinable: e.target.value });
  }

  updateCombinable(e) {
    this.setState({ _combinable: e.target.checked });
  }

  expand(e) {
    e.preventDefault();
    this.setState({ _teamname: this.state.teamname,
                    _combinable: this.state.combinable,
                    _members: this.state.members.slice(), expanded: true });
  }

  cancel(e) {
    e.preventDefault();
    this.setState({ _teamname: "", _members: ["", "", "", ""],
                    _combinable: true, expanded: false });
  }

  save(e) {
    e.preventDefault();

    let requiredError = 'This field is required.';
    let inputError = {
      borderColor: '#ff0033'
    };

    let teamnameErrorText = "", firstMemberErrorText = "";

    let { _teamname, _members, _combinable } = this.state;
    _teamname = _teamname.trim();
    _members = _members.filter((e) => e); // remove falsy fields
    _members = _members.map((e) => e.trim());
    if (_members.length === 0) {
      firstMemberErrorText = "Enter at least one team member.";
    }
    // Pad array to length 4.
    if (_members.length < 4) {
      _members = Array.prototype.concat.call(_members, Array(4-_members.length).fill(""));
    }

    if (!_teamname) { teamnameErrorText = requiredError; }

    this.setState({
      teamnameErrorText: teamnameErrorText,
      teamnameErrorStyle: teamnameErrorText ? inputError : {},
      firstMemberErrorText: firstMemberErrorText,
      firstMemberErrorStyle: firstMemberErrorText ? inputError : {}
    });
    if (teamnameErrorText || firstMemberErrorText) {
      return;
    }
    this.setState({ teamname: _teamname, members: _members,
                    expanded: false, combinable: _combinable,
                    _teamname: "", _members: ["", "", "", ""],
                    price: this.props.price(_members, _combinable) },
                    () => this.props.save(this, { request: true }));
  }

  render() {
    let { id } = this.props;
    return (
      <Card style={{ padding: (this.state.expanded ? "8px" : "20px") + " 20px",
      borderBottom: "1px solid #DDDDDD", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "baseline" }}>
          <h6 style={{ textOverflow: "ellipsis", whiteSpace: "nowrap",
            fontSize: "1.2em", marginBottom: "0px", overflow: "hidden",
            display: this.state.expanded ? "none" : "block", marginRight: ".5rem",
          fontWeight: "500", fontFamily: "Montserrat" }}>{this.state.teamname}</h6>
          <span style={{ display: this.state.expanded ? "none" : "block" }}>
            {"$" + this.props.price(this.state.members, this.state.combinable)}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden",
            display: this.state.expanded ? "none" : "block",
          color: this.state.members ? "inherit" : "#888"}}>
            {(() => {
              if (this.state.members) {
                let members = this.state.members;
                members = members.filter((e) => e);
                return members.join(', ');
              }
              else {
                return "No members. Add one?";
              }
            })()}
          </span>
          <span>
            <a href="#" onClick={this.expand}
              style={{ display: this.state.expanded ? "none" : "block" }}>
              <i className="material-icons" style={{ verticalAlign: "middle" }}
                dangerouslySetInnerHTML={{ __html: this.state.expanded ? "done" : "expand_more" }}>
              </i>
            </a>
          </span>
          <Form name={"team" + id} style={{ marginTop: "10px", width: "100%",
          display: this.state.expanded ? "block" : "none" }}>
            <Group name="teamname">
              <Label>
                Team name<br/>
                <ErrorText>{this.state.teamnameErrorText}</ErrorText>
              </Label>
              <Input value={this.state._teamname} style={{ width: "100%",
              ...this.state.teamnameErrorStyle }}
                type="text" onChange={this.updateName}/>
            </Group>
            <Label>
              Members<br/>
              <ErrorText>{this.state.firstMemberErrorText}</ErrorText>
            </Label>
            <Group name="member0">
              <Input value={this.state._members[0]} style={{ width: "100%",
              ...this.state.firstMemberErrorStyle }}
                type="text" onChange={this.updateMember(0)}/>
            </Group>
            <Group name="member1">
              <Input value={this.state._members[1]} style={{ width: "100%" }}
                type="text" onChange={this.updateMember(1)}/>
            </Group>
            <Group name="member2">
              <Input value={this.state._members[2]} style={{ width: "100%" }}
                type="text" onChange={this.updateMember(2)}/>
            </Group>
            <Group name="member3">
              <Input value={this.state._members[3]} style={{ width: "100%" }}
                type="text" onChange={this.updateMember(3)}/>
            </Group>
            <Group name="combine">
              {(() => {
                let _members = this.state._members;
                let length = _members.filter((e) => e).length;
                if (length < 4) {
                  return (
                    <Label style={{ fontWeight: "normal", marginBottom: ".4rem" }}>
                      <Input checked={this.state._combinable}
                        onChange={this.updateCombinable}
                        style={{ marginBottom: "0px" }} type="checkbox"/>&nbsp;
                      Combine this team with teams from other&nbsp;schools.
                    </Label>
                  );
                }
              })()}
            </Group>
            <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "baseline", paddingLeft: "10px" }}>
              <a href="#" style={{ fontSize: ".8em" }} onClick={(e) => {
                e.preventDefault();
                this.props.del();
              }}>Delete this team</a>
              <div style={{ display: "flex", justifyContent: "flex-end",
              alignItems: "baseline" }}>
                <span style={{ display: this.state.expanded ? "block" : "none" }}>
                  {"$" + this.props.price(this.state._members, this.state._combinable)}
                </span>
                {(() => {
                  if (this.state.teamname) {
                    return (<Button onClick={this.cancel} className="button"
                      style={{ float: "right", paddingLeft: "12px", paddingRight: "10px",
                      marginLeft: "10px", display: "flex", alignItems: "center" }}>
                      Cancel
                      <i className="material-icons">clear</i>
                    </Button>);
                  }
                })()}
                <Button type="submit" onClick={this.save} className="button-primary"
                  style={{ float: "right", paddingLeft: "12px", paddingRight: "10px",
                  marginLeft: "10px", display: "flex", alignItems: "center" }}>
                  Save
                  <i className="material-icons"
                    dangerouslySetInnerHTML={{ __html: this.state.expanded ? "done" : "expand_more" }}>
                  </i>
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    );
  }
}

export { TeamView };
