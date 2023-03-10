import { useTeams } from "../hooks/useTeams";
import { useRouter } from "next/router";
import RefreshIcon from "./Icons/RefreshIcon";

const FormConfig = () => {
  const {
    handleResetTeams,
    handleShareTeams,
    handleGenerateTeams,
    handleMaxTeam,
    handleTeamNameFormat,
    teamsFormatNameOptions,
    config,
    teams,
  } = useTeams();
  const router = useRouter();

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
              {Object.keys(teamsFormatNameOptions).map((key) => {
                return (
                  <option value={key} key={key}>
                    {teamsFormatNameOptions[key].title}
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
          <RefreshIcon /> bagi
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
