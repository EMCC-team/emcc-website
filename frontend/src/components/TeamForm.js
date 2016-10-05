import React from 'react';
import axios from 'axios';

import { Form, Group, Label, ErrorText, Input, Button } from '../components/Form';
import Card from '../components/Card';
import '../fonts/Montserrat.css';

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.updateMember = this.updateMember.bind(this);
    this.updateName = this.updateName.bind(this);
    this.expand = this.expand.bind(this);
    this.cancel = this.cancel.bind(this);
    this.price = this.price.bind(this);
    this.save = this.save.bind(this);

    let { members, expanded, number, teamname } = this.props
    this.state = { expanded: false, members, expanded, number, teamname };

    if (!this.state.members) {
      this.state.members = ["", "", "", ""];
    }
    this.state.unsavedMembers = this.state.members.slice();
    if (!this.state.teamname) {
      this.state.teamname = "";
    }
    this.state.unsavedTeamname = this.state.teamname;
  }

  componentWillMount() {
    this.props.updatePrice(this.price(this.state.members));
  }

  updateMember(memberIndex) {
    return (e) => {
      e.preventDefault();
      let unsavedMembers = this.state.unsavedMembers;
      unsavedMembers[memberIndex] = e.target.value;
      this.setState({ unsavedMembers });
    }
  }

  updateName(e) {
    e.preventDefault();
    this.setState({ unsavedTeamname: e.target.value });
  }

  price(members) {
    let length = members.filter((e) => e).length;
    if (length === 4) {
      return 50;
    }
    else {
      return length * 15;
    }
  }

  expand(e) {
    e.preventDefault();
    this.setState({ unsavedTeamname: this.state.teamname,
                    unsavedMembers: this.state.members.slice(), expanded: true });
  }

  cancel(e) {
    e.preventDefault();
    this.setState({ unsavedTeamname: "", unsavedMembers: ["", "", "", ""], expanded: false });
  }

  save(e) {
    e.preventDefault();

    let requiredError = 'This field is required.';
    let inputError = {
      borderColor: '#ff0033'
    };

    let teamnameErrorText = "", firstMemberErrorText = "";

    let { unsavedTeamname, unsavedMembers } = this.state;
    unsavedTeamname = unsavedTeamname.trim();
    unsavedMembers = unsavedMembers.filter((e) => e); // remove empty and undefined fields
    unsavedMembers = unsavedMembers.map((e) => e.trim());
    if (unsavedMembers.length === 0) {
      firstMemberErrorText = "Enter at least one team member.";
    }
    if (unsavedMembers.length < 4) {
      unsavedMembers = Array.prototype.concat.call(unsavedMembers, Array(4-unsavedMembers.length).fill(""));
    }

    if (!unsavedTeamname) { teamnameErrorText = requiredError; }

    this.setState({
      teamnameErrorText: teamnameErrorText,
      teamnameErrorStyle: teamnameErrorText ? inputError : {},
      firstMemberErrorText: firstMemberErrorText,
      firstMemberErrorStyle: firstMemberErrorText ? inputError : {}
    });
    if (teamnameErrorText || firstMemberErrorText) {
      return;
    }
    this.props.updatePrice(this.price(unsavedMembers));
    this.setState({ teamname: unsavedTeamname, members: unsavedMembers, expanded: false,
                    unsavedTeamname: "", unsavedMembers: ["", "", "", ""] });
  }

  render() {
    let { number } = this.props;
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
            {"$" + this.price(this.state.members)}
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
          <Form name={"team" + number} style={{ marginTop: "10px", width: "100%",
              display: this.state.expanded ? "block" : "none" }}>
            <Group name="teamname">
              <Label>
                Team name<br/>
                <ErrorText>{this.state.teamnameErrorText}</ErrorText>
              </Label>
              <Input value={this.state.unsavedTeamname} style={{ width: "100%",
                ...this.state.teamnameErrorStyle }}
                type="text" onChange={this.updateName}/>
            </Group>
            <Label>
              Members<br/>
              <ErrorText>{this.state.firstMemberErrorText}</ErrorText>
            </Label>
            <Group name="member0">
              <Input value={this.state.unsavedMembers[0]} style={{ width: "100%",
                ...this.state.firstMemberErrorStyle }}
                type="text" onChange={this.updateMember(0)}/>
            </Group>
            <Group name="member1">
              <Input value={this.state.unsavedMembers[1]} style={{ width: "100%" }}
                type="text" onChange={this.updateMember(1)}/>
            </Group>
            <Group name="member2">
              <Input value={this.state.unsavedMembers[2]} style={{ width: "100%" }}
                type="text" onChange={this.updateMember(2)}/>
            </Group>
            <Group name="member3">
              <Input value={this.state.unsavedMembers[3]} style={{ width: "100%" }}
                type="text" onChange={this.updateMember(3)}/>
            </Group>
            <Group name="combine">
              {(() => {
                let unsavedMembers = this.state.unsavedMembers;
                let length = unsavedMembers.filter((e) => e).length;
                if (length < 4) {
                  return (
                      <Label style={{ fontWeight: "normal", marginBottom: ".4rem" }}>
                        <Input style={{ marginBottom: "0px" }} type="checkbox"/>&nbsp;
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
                  {"$" + this.price(this.state.unsavedMembers)}
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
