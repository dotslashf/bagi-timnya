import { useEffect } from "react";
import { useAppContext } from "../context/state";
import Drawers from "./Drawers";

const Layout = () => {
  const state = useAppContext();
  const [isGenerated, _] = state.isGenerated;
  const [teams] = state.teamsHash;
  console.log(teams);

  useEffect(() => {}, [isGenerated, state.teamsHash, teams]);

  return (
    <main className="grid grid-cols-3 w-full h-screen bg-white">
      <aside className="mx-auto flex flex-col py-4 w-full border-r border-gray-400 border-opacity-30">
        <h1 className="text-3xl text-center tracking-wide font-bold">
          bagi-timnya 🎲
        </h1>
        <Drawers />
      </aside>
      <section className="bg-white col-span-2 p-4">
        {!isGenerated && !teams ? (
          <p>List tim akan muncul disini</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(teams!).map((team) => {
              const players = teams![team];

              return (
                <div
                  className="w-full max-w-xs p-3 bg-white border rounded-lg shadow-md sm:px-6 sm:py-4"
                  key={team}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 ">
                      Tim {team}
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
                                <p className="text-xs font-medium text-gray-900 truncate">
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
            {/* {Array.from(teams.entries()).map(([team, players]) => {
              return (
                <div
                  className="w-full max-w-xs p-3 bg-white border rounded-lg shadow-md sm:px-6 sm:py-4"
                  key={team}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 ">
                      Tim {team}
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
                          <li className="pb-2" key={player}>
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">
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
            })} */}
          </div>
        )}
      </section>
    </main>
  );
};

export default Layout;
