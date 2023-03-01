import React, { createContext } from "react";
import { TeamsObject } from "../@types/TeamsObject";

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
