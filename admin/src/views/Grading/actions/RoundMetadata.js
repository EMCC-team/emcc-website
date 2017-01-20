export const setGrader = (grader) => {
  return { type: 'SET_GRADER', grader }
}

export const setRound = (round) => {
  return { type: 'SET_ROUND', round }
}

export const setSubround = (subround) => {
  return { type: 'SET_SUBROUND', subround }
}

export const setTeam = (team) => {
  return { type: 'SET_TEAM', team }
}

export const setTeamMember = (team_member) => {
  return { type: 'SET_TEAM_MEMBER', team_member }
}
