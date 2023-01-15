import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import Cards from "./Cards";
import Drawers from "./Drawers";
import queryString from "query-string";

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
  const [teams, setTeams] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();

  useEffect(() => {
    if (router.query && Object.keys(router.query).length > 0) {
      setTeams(router.query as { [key: string]: string[] });
    }
  }, [isGenerated, router.query, state.teamsHash]);

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
            <Cards teams={teams} />
          )}
        </section>
      </main>
    </TeamsContext.Provider>
  );
};
