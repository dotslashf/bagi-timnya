import crypto from "crypto";

export function getRandomFromArray(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const selected = arr[randomIndex];
  arr.splice(randomIndex, 1);
  return selected;
}

export function randomTeamsName(arr: string[], max: number) {
  const teams = shuffleArray(arr);
  return teams.slice(0, max);
}

export function shuffleArray(arr: string[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export function distributePlayers(
  players: string[],
  // teamNames: string[] | number[]
  maxTeams: number
) {
  players.sort(() => Math.random() - 0.5);
  let teams = {} as { [key: string]: string[] };
  let teamSize = Math.floor(players.length / maxTeams);
  let remainder = players.length % maxTeams;
  for (let i = 0; i < maxTeams; i++) {
    let team = players.slice(i * teamSize, (i + 1) * teamSize);
    if (remainder > 0) {
      team.push(players[maxTeams * teamSize + remainder - 1]);
      remainder--;
    }
    teams[crypto.randomBytes(20).toString("hex")] = team;
  }
  return teams;
}

export function changeTeamsName(
  teams: { [key: string]: string[] },
  teamNames: string[]
) {
  const changedTeams = {} as { [key: string]: string[] };
  Object.entries(teams).forEach(([_, value], index) => {
    changedTeams[teamNames[index]] = value;
  });
  return changedTeams;
}
