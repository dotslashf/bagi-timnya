import React, { useContext, useEffect, useState } from "react";
import { changeTeamsName, randomTeamsName } from "../common/util";
import { useAppContext } from "../context/state";
import { TeamsContext, TeamsObject } from "../context/teamContext";
import Card from "./Card";

interface Cards {
  teams: TeamsObject[];
}

const Cards = () => {
  const { teams, isUpdateTeamDetail } = useContext(TeamsContext)
  const { teamsFormatName } = useAppContext().configContext.config;
  const teamsFormat = useAppContext().teamsFormatNameOptions;
  const { config } = useAppContext().configContext;
  const [formattedTeams, setFormattedTeams] = useState<TeamsObject[]>([]);
  const { teamsFormatName: teamsFormatNameTemporary } =
    useAppContext().teamsFormatNameTemporary;

  useEffect(() => {
    if (isUpdateTeamDetail) {
      return;
    }
    const listTeamsName = randomTeamsName(
      config.isFromShareLink
        ? teamsFormatNameTemporary.list
        : teamsFormat[teamsFormatName].list,
      config.isFromShareLink
        ? teamsFormatNameTemporary.list.length
        : teamsFormat[teamsFormatName].list.length
    );
    const formattedTeamsName = changeTeamsName(
      teams,
      listTeamsName,
      config.isFromShareLink ? "temporary" : teamsFormatName,
      config.isFromShareLink
    );
    setFormattedTeams(formattedTeamsName);
  }, [
    teams,
    teamsFormatName,
    teamsFormat,
    config.isFromShareLink,
    teamsFormatNameTemporary,
  ]);

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-3">
      {(isUpdateTeamDetail ? teams : formattedTeams).map((team) => {
        if (
          config.teamsFormatName === "placeholder" ||
          config.teamsFormatName === "default"
        ) {
          team.emoji = "";
        }
        return (
          <Card
            players={team.players}
            teamName={team.name}
            key={team.uuid}
            emoji={team.emoji}
            uuid={team.uuid}
          />
        );
      })}
    </div>
  );
};

export default Cards;
