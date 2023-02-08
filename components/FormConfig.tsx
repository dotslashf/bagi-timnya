import { useContext, useEffect, useState } from "react";
import { Config, useAppContext } from "../context/state";
import { distributePlayers, shuffleArray } from "../common/util";
import { toast } from "react-toastify";
import { TeamsContext } from "./Layout";
import queryString from "query-string";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

    const listPlayersName = shuffleArray([...playersName]);

    const teamsAndPlayerHash = distributePlayers(
      listPlayersName,
      config.numberOfTeams
    );
    setTeams(teamsAndPlayerHash);
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

  function handleResetTeams() {
    setTeams({});
    setIsGenerated(false);
    router.replace("/", undefined, { shallow: true });
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

      {router.query && Object.keys(router.query).length > 0 ? (
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition"
          onClick={handleResetTeams}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="inline-block w-4 h-4 mr-1"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            ></path>
          </svg>{" "}
          reset team
        </button>
      ) : (
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
      )}

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
