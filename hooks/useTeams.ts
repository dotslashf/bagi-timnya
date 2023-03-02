import React, { useContext, useEffect, useState } from "react";
import { Config } from "../@types/Config";
import { useAppContext } from "../context/state";
import { TeamsContext } from "../context/teamContext";
import { toast } from "react-toastify";
import { distributePlayers, shufflePlayers } from "../common/util";
import { useRouter } from "next/router";
import { TeamsObject } from "../@types/TeamsObject";
import { TeamUtils } from "../utils/TeamUtils";

export const useTeams = () => {
  const teamUtils: TeamUtils = new TeamUtils();
  const MIN_PLAYERS_PER_TEAM = 1;
  const { configContext, isGenerated, playerContext, teamsFormatNameOptions } =
    useAppContext();
  const { config, setConfig } = configContext;
  const [, setIsGenerated] = isGenerated;
  const { playersName } = playerContext;
  const { teams, setTeams, setIsUpdateTeamDetail } = useContext(TeamsContext);
  const [localConfig, setLocalConfig] = useState<Config>(config);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const router = useRouter();

  function handleTeamNameFormat(event: React.ChangeEvent<HTMLSelectElement>) {
    setLocalConfig({
      ...localConfig,
      teamsFormatName: event.target.value,
    });
  }

  function handleMaxTeam(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalConfig({
      ...localConfig,
      numberOfTeams: parseInt(event.target.value),
    });
  }

  function handleGenerateTeams() {
    const isThereEmptyName = playersName.some((player) => player === "");
    if (isThereEmptyName) {
      return toast.error("Ada baris yang kosong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (playersName.length === 0) {
      return toast.error("Belum ada pemain!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    const maxPlayersPerTeam = Math.floor(
      playersName.length / config.numberOfTeams,
    );
    if (maxPlayersPerTeam < MIN_PLAYERS_PER_TEAM) {
      return toast.error("Jumlah pemain per tim tidak cukup!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const listPlayersName: string[] = shufflePlayers([...playersName]);

    const teamsAndPlayerHash: TeamsObject[] = distributePlayers(
      listPlayersName,
      config.numberOfTeams,
    );
    setIsUpdateTeamDetail(false);
    setTeams(teamsAndPlayerHash);
    teamUtils.push(teamsAndPlayerHash);
    setIsGenerated(true);
  }

  async function handleShareTeams() {
    const stringTeams = `${teams
      .map((team) => JSON.stringify(team))
      .join("&teams=")}`;
    const stringFormatName = JSON.stringify(config.teamsFormatName);
    const url = new URL(
      `${origin}?teams=${stringTeams}&formatName=${stringFormatName}`,
    );
    await navigator.clipboard.writeText(url.href);
    toast.info("Link berhasil disalin!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function handleResetTeams() {
    setTeams([]);
    setIsGenerated(false);
    setConfig({
      numberOfTeams: 2,
      teamsFormatName: "placeholder",
      isFromShareLink: false,
      isReset: true,
    });
    router.replace("/", undefined, { shallow: true });
  }

  useEffect(() => {
    setConfig(localConfig);
  }, [localConfig, setConfig]);
  return {
    localConfig,
    setLocalConfig,
    origin,
    handleTeamNameFormat,
    handleMaxTeam,
    handleGenerateTeams,
    handleShareTeams,
    handleResetTeams,
    teamsFormatNameOptions,
    setConfig,
    config,
    teams,
  };
};
