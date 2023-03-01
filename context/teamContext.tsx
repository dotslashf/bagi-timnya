import React, { createContext } from "react";
import { TeamsObject } from "../@types/TeamsObject";

export type { TeamsObject };

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
  setIsUpdateTeamDetail: () => {},
});
