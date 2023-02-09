import { createContext } from "react";

export interface TeamsObject {
  uuid: string;
  name: string;
  players: string[];
  // TODO: add emoji and score
  emoji?: string;
  score?: number;
}

interface TeamsContextType {
  teams: TeamsObject[];
  setTeams: React.Dispatch<React.SetStateAction<TeamsObject[]>>;
}
export const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  setTeams: (teams) => {
    return teams;
  },
});
