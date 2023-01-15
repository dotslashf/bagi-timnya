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
  teamNames: string[] | number[]
) {
  players.sort(() => Math.random() - 0.5);
  let teams = {} as { [key: string]: string[] };
  let teamSize = Math.floor(players.length / teamNames.length);
  let remainder = players.length % teamNames.length;
  for (let i = 0; i < teamNames.length; i++) {
    let team = players.slice(i * teamSize, (i + 1) * teamSize);
    if (remainder > 0) {
      team.push(players[teamNames.length * teamSize + remainder - 1]);
      remainder--;
    }
    teams[teamNames[i]] = team;
  }
  return teams;
}

export function sortTeams(teams: { [key: string]: string[] }) {
  const sortedTeams = {} as { [key: string]: string[] };
  Object.entries(teams)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([key, value]) => {
      sortedTeams[key] = value;
    });
  return sortedTeams;
}
