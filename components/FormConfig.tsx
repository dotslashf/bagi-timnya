import { useContext, useEffect, useState } from "react";
import { Config, useAppContext } from "../context/state";
import {
  distributePlayers,
  randomTeamsName,
  shuffleArray,
  sortTeams,
} from "../common/util";
import { toast } from "react-toastify";
import { TeamsContext } from "./Layout";
import queryString from "query-string";

const MIN_PLAYERS_PER_TEAM = 1;

const FormConfig = () => {
  const state = useAppContext();
  const { config, setConfig } = state.configContext;
  const [_, setIsGenerated] = state.isGenerated;
  const { playersName } = state.playerContext;
  const { teams, setTeams } = useContext(TeamsContext);
  const [localConfig, setLocalConfig] = useState<Config>(config);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

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
    const sortedTeams = sortTeams(teamsAndPlayerHash);

    setTeams(sortedTeams);
    setIsGenerated(true);
  }

  async function handleShareTeams() {
    const queryTeams = queryString.stringify(teams);
    const url = new URL(`${origin}?${queryTeams}`);
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
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition"
        onClick={handleGenerateTeams}
      >
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="inline-block w-4 h-4 mr-1"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
          ></path>
        </svg>{" "}
        bagi
      </button>
      {Object.keys(teams).length > 0 && (
        <button
          type="button"
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
          onClick={handleShareTeams}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="inline-block w-4 h-4 mr-1"
          >
            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"></path>
          </svg>{" "}
          share hasil teamnya
        </button>
      )}
    </div>
  );
};

export default FormConfig;
