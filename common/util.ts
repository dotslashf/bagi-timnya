import crypto from "crypto";
import { TeamsObject } from "../context/teamContext";

export function getRandomFromArray(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const selected = arr[randomIndex];
  arr.splice(randomIndex, 1);
  return selected;
}

export function randomTeamsName(
  list: {
    emoji?: string;
    name: string;
  }[],
  max: number,
) {
  return shuffleArray(list).slice(0, max);
}

export function shuffleArray(
  list: {
    emoji?: string;
    name: string;
  }[],
) {
  return list.sort(() => Math.random() - 0.5);
}

export function shufflePlayers(players: string[]) {
  return players.sort(() => Math.random() - 0.5);
}

export function distributePlayers(
  players: string[],
  maxTeams: number,
): TeamsObject[] {
  players.sort(() => Math.random() - 0.5);
  let teams = {} as {
    [key: string]: {
      name: string;
      players: string[];
    };
  };
  let teamSize = Math.floor(players.length / maxTeams);
  let remainder = players.length % maxTeams;
  for (let i = 0; i < maxTeams; i++) {
    const team = players.slice(i * teamSize, (i + 1) * teamSize);
    if (remainder > 0) {
      team.push(players[maxTeams * teamSize + remainder - 1]);
      remainder--;
    }
    const uuid = crypto.randomBytes(20).toString("hex");
    teams[uuid] = {
      name: uuid,
      players: team,
    };
  }

  return Object.entries(teams).map(([key, value]) => {
    return {
      name: value.name,
      players: value.players,
      uuid: key,
    };
  });
}

export function changeTeamsName(
  teams: TeamsObject[],
  teamNames: {
    emoji?: string;
    name: string;
  }[],
  teamsFormatName: string,
  isFromShareLink?: boolean,
) {
  if (isFromShareLink) {
    return teams.map((team) => {
      team.name = teams.find((t) => t.uuid === team.uuid)!.name;
      team.emoji = teams.find((t) => t.uuid === team.uuid)?.emoji;
      return team;
    });
  }
  return teamsFormatName === "placeholder" || teamsFormatName === "default"
    ? teams.map((team, i) => {
        team.name = `Team ${i + 1}`;
        return team;
      })
    : teams.map((team, i) => {
        team.name = teamNames[i].name;
        team.emoji = teamNames[i].emoji;
        return team;
      });
}

export function generateTeamsToShare(teams: TeamsObject[]) {
  return new Map<
    string,
    {
      name: string;
      emoji?: string;
      players: string[];
    }
  >(
    teams.map((team) => [
      team.uuid,
      {
        name: team.name,
        emoji: team.emoji,
        players: team.players,
      },
    ]),
  );
}
