import React from 'react';
import axios from 'axios';

import { Form, Group, Label, ErrorText, Input, Button } from '../components/Form';
import Card from '../components/Card';
import '../fonts/Montserrat.css';

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.updateCombinable = this.updateCombinable.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateSchool = this.updateSchool.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.expand = this.expand.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);

    this.state = { expanded: this.props.expanded, ...this.props.team };

    if (!this.state.members) {
      this.state.members = ["", "", "", ""];
    }
    this.state._members = this.state.members.slice();

    if (!this.state.name) {
      this.state.name = "";
    }
    this.state._name = this.state.name;

    if (!this.state.school) {
      this.state.school = "";
    }
    this.state._school = this.state.school;

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
    this.setState({ _name: e.target.value });
  }

  updateSchool(e) {
    e.preventDefault();
    this.setState({ _school: e.target.value });
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
    this.setState({ _name: this.state.name, _school: this.state.school,
                    _combinable: this.state.combinable,
                    _members: this.state.members.slice(), expanded: true },
                    () => {
                      this.props.save(this)
                    });
  }

  cancel(e) {
    if (e) { e.preventDefault(); }
    this.setState({ _name: "", _school: "", _members: ["", "", "", ""],
                    _combinable: true, expanded: false },
                    () => {
                      this.props.save(this)
                    });
  }

  save(e) {
    e.preventDefault();

    let requiredError = 'This field is required.';
    let inputError = {
      borderColor: '#ff0033'
    };

    let nameErrorText = "", schoolErrorText = "", firstMemberErrorText = "";

    let { _name, _school, _members } = this.state;
    _name = _name.trim();
    _school = _school.trim();
    _members = _members.filter((e) => e); // remove falsy fields
    _members = _members.map((e) => e.trim());
    if (_members.length === 0) {
      firstMemberErrorText = "Enter at least one team member.";
    }
    // Pad array to length 4.
    if (_members.length < 4) {
      _members = Array.prototype.concat.call(_members, Array(4-_members.length).fill(""));
    }

    if (!_name) { nameErrorText = requiredError; }
    if (!_school) { schoolErrorText = requiredError; }

    this.setState({
      nameErrorText: nameErrorText,
      nameErrorStyle: nameErrorText ? inputError : {},
      schoolErrorText: schoolErrorText,
      schoolErrorStyle: schoolErrorText ? inputError : {},
      firstMemberErrorText: firstMemberErrorText,
      firstMemberErrorStyle: firstMemberErrorText ? inputError : {}
    });
    if (nameErrorText || schoolErrorText || firstMemberErrorText) {
      return false;
    }
    this.setState({ name: _name, school: _school, members: _members,
                    combinable: this.state.combinable, expanded: false,
                    price: this.props.price(_members, this.state._combinable) },
                    () => {
                      this.props.save(this, true)
                      this.cancel();
                    });
    return true;
  }

  render() {
    let { id } = this.props.team;
    return (
      <Card style={{ padding: (this.state.expanded ? "8px" : "20px") + " 20px",
      borderBottom: "1px solid #DDDDDD", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "baseline" }}>
          <h6 style={{ textOverflow: "ellipsis", whiteSpace: "nowrap",
            fontSize: "1.2em", marginBottom: "0px", overflow: "hidden",
            display: this.state.expanded ? "none" : "block", marginRight: ".5rem",
          fontWeight: "500", fontFamily: "Montserrat" }}>{this.state.name}</h6>
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
          display: this.state.expanded ? "block" : "none" }}
            onKeyPress={(e) => {if (e && e.charCode === 13) {this.save(e)}}}>
            <Group name="name">
              <Label>
                Team name<br/>
                <ErrorText>{this.state.nameErrorText}</ErrorText>
              </Label>
              <Input value={this.state._name} style={{ width: "100%",
              ...this.state.nameErrorStyle }}
                type="text" onChange={this.updateName}/>
            </Group>
            <Group name="school">
              <Label>
                School<br/>
                <ErrorText>{this.state.schoolErrorText}</ErrorText>
              </Label>
              <Input value={this.state._school} style={{ width: "100%",
              ...this.state.schoolErrorStyle }}
                type="text" onChange={this.updateSchool}/>
            </Group>
            <Label>
              Team members<br/>
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
                    <div>
                    <Label style={{ fontWeight: "normal", marginBottom: ".4rem" }}>
                      <Input checked={this.state._combinable}
                        onChange={this.updateCombinable}
                        style={{ marginBottom: "0px" }} type="checkbox"/>&nbsp;
                      Combine this team with other unfilled teams.&nbsp;
                      <Card style={{ position: "absolute", right: "0",
                        backgroundColor: "#FFFFFF", maxWidth: "350px",
                        padding: "10px", width: "60vw",
                        display: this.state.showHint ? "block" : "none" }}>
                        If this option is checked, we'll try to combine your
                        team with other teams to make a full four person team.
                        Due to space limitations, if this box is unchecked
                        we must charge you the full cost of a team ($50) even
                        if there are not four people on it.
                        <a style={{ float: "right" }} href="#" onClick={e => {
                          e.preventDefault()
                          this.setState({ showHint: !this.state.showHint });
                        }}>close</a>
                      </Card>
                      <a href="#" onClick={e => {
                        e.preventDefault()
                        this.setState({ showHint: !this.state.showHint });
                      }}>?</a>
                    </Label>
                    </div>
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
                  if (this.state.name) {
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
