import { createContext, useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import Drawers from "./Drawers";

interface TeamsContextType {
  teams: { [key: string]: string[] };
  setTeams: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}
export const TeamsContext = createContext<TeamsContextType>({
  teams: {},
  setTeams: (teams) => {
    return teams;
  },
});

export const Layout = () => {
  const state = useAppContext();
  const [isGenerated, _] = state.isGenerated;
  const [teams, setTeams] = useState({});
  const { config } = state.configContext;

  useEffect(() => {}, [isGenerated, state.teamsHash]);

  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      <main className="grid grid-cols-3 w-full bg-white overflow-y-scroll h-auto md:h-screen">
        <aside className="py-4 flex flex-col w-full border-b border-r-0 md:border-r md:border-b-0 border-gray-400 border-opacity-30 col-span-3 md:col-span-1">
          <h1 className="text-3xl text-center tracking-wide font-bold">
            bagi-timnya 🎲
          </h1>
          <Drawers />
        </aside>
        <section className="bg-white col-span-3 md:col-span-2 p-4">
          {!isGenerated && !teams ? (
            <p className="md:text-left text-center">
              Daftar tim akan muncul disini
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Object.keys(teams!).map((team) => {
                const players = teams![team];

                return (
                  <div
                    className="w-full max-w-xs p-3 bg-white border rounded-lg shadow-md sm:px-6 sm:py-4"
                    key={team}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-xl font-bold leading-none text-gray-900 ">
                        {team}
                      </h5>
                    </div>
                    <div className="flow-root">
                      <ul role="list" className="divide-y divide-gray-200">
                        {players.map((player) => {
                          let padding = "py-2";
                          if (players.length === 1) {
                            padding = "pb-2";
                          }
                          if (players.length === players.length - 1) {
                            padding = "pt-2";
                          }
                          return (
                            <li className={padding} key={player}>
                              <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900">
                                    {player}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </TeamsContext.Provider>
  );
};
