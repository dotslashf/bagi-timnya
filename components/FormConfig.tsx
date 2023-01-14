import { useContext, useEffect, useState } from "react";
import { Config, useAppContext } from "../context/state";
import {
  distributePlayers,
  randomTeamsName,
  shuffleArray,
} from "../common/util";
import { toast } from "react-toastify";
import { TeamsContext } from "./Layout";

const MIN_PLAYERS_PER_TEAM = 2;

const FormConfig = () => {
  const state = useAppContext();
  const { config, setConfig } = state.configContext;
  const [_, setIsGenerated] = state.isGenerated;
  const { playersName } = state.playerContext;
  const [selectedTeamsFormatName, setSelectedTeamsFormatName] = useState(
    config.teamsFormatName || "placeholder"
  );
  const { setTeams } = useContext(TeamsContext);
  const [localConfig, setLocalConfig] = useState<Config>(config);

  useEffect(() => {
    setConfig(localConfig);
  }, [localConfig, setConfig]);

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
    console.log("Generate Teams");
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
      playersName.length / config.numberOfTeams
    );
    if (maxPlayersPerTeam < MIN_PLAYERS_PER_TEAM) {
      return toast.error("Jumlah player per tim tidak cukup!", {
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

    const listTeamsName = [
      ...state.teamsFormatNameOptions[config.teamsFormatName].list,
    ];
    const listPlayersName = shuffleArray([...playersName]);

    const teamsName =
      config.teamsFormatName === "placeholder" ||
      config.teamsFormatName === "default"
        ? Array.from({ length: config.numberOfTeams }, (_, i) => `Tim ${i + 1}`)
        : randomTeamsName(listTeamsName, config.numberOfTeams);

    const teamsAndPlayerHash = distributePlayers(listPlayersName, teamsName);

    setTeams(teamsAndPlayerHash);
    setIsGenerated(true);
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-3 space-x-0 space-y-3 md:space-y-0 justify-between items-center">
        <div className="flex flex-col w-full">
          <label className="flex flex-col text-sm font-medium text-gray-900 ">
            Format Nama Tim
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
              onChange={handleTeamNameFormat}
              value={config.teamsFormatName}
            >
              {Object.keys(state.teamsFormatNameOptions).map((key) => {
                return (
                  <option value={key} key={key}>
                    {state.teamsFormatNameOptions[key].title}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex flex-col text-sm font-medium text-gray-900 ">
            Jumlah Tim
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2 placeholder-gray-300"
              placeholder="2"
              min={2}
              max={20}
              value={config.numberOfTeams}
              onChange={handleMaxTeam}
            />
          </label>
        </div>
      </div>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={handleGenerateTeams}
      >
        bagi
      </button>
    </div>
  );
};

export default FormConfig;
