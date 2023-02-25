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
  isUpdateTeamDetail: boolean;
  setIsUpdateTeamDetail: React.Dispatch<React.SetStateAction<boolean>>;
}
export const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  setTeams: (teams) => {
    return teams;
  },
  isUpdateTeamDetail: false,
  setIsUpdateTeamDetail: () => { }
});
