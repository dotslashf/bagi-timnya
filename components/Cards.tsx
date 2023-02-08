import React, { useContext, useEffect, useState } from "react";
import { changeTeamsName, randomTeamsName } from "../common/util";
import { useAppContext } from "../context/state";
import { TeamsContext, TeamsObject } from "../context/teamContext";
import Card from "./Card";

interface Cards {
  teams: TeamsObject[];
}

const Cards = () => {
  const { teams } = useContext(TeamsContext);
  const { teamsFormatName } = useAppContext().configContext.config;
  const teamsFormat = useAppContext().teamsFormatNameOptions;

  const [formattedTeams, setFormattedTeams] = useState<TeamsObject[]>([]);

  useEffect(() => {
    const listTeamsName = randomTeamsName(
      teamsFormat[teamsFormatName].list,
      teamsFormat[teamsFormatName].list.length
    );
    const formattedTeamsName = changeTeamsName(
      teams,
      listTeamsName,
      teamsFormatName
    );
    setFormattedTeams(formattedTeamsName);
  }, [teams, teamsFormatName, teamsFormat]);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {formattedTeams.map((team) => {
        return (
          <Card players={team.players} teamName={team.name} key={team.name} />
        );
      })}
    </div>
  );
};

export default Cards;
