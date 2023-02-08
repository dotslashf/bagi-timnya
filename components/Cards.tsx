import React, { useContext, useEffect, useState } from "react";
import { changeTeamsName, randomTeamsName } from "../common/util";
import { useAppContext } from "../context/state";
import Card from "./Card";
import { TeamsContext } from "./Layout";

interface Cards {
  teams: { [key: string]: string[] };
}

const Cards = () => {
  const { teams } = useContext(TeamsContext);
  const { teamsFormatName } = useAppContext().configContext.config;
  const teamsFormat = useAppContext().teamsFormatNameOptions;

  const [formattedTeams, setFormattedTeams] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    const listTeamsName = randomTeamsName(
      teamsFormat[teamsFormatName].list,
      teamsFormat[teamsFormatName].list.length
    );
    const formattedTeamsName = changeTeamsName(teams, listTeamsName);
    setFormattedTeams(formattedTeamsName);
    console.log("teams", teams);
  }, [teams, teamsFormatName, teamsFormat]);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Object.keys(formattedTeams).map((team) => {
        const players = formattedTeams[team];
        return (
          <Card
            players={players}
            teamName={team}
            key={team}
            teamsFormatName={teamsFormatName}
          />
        );
      })}
    </div>
  );
};

export default Cards;
