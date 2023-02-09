import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import Cards from "./Cards";
import Drawers from "./Drawers";
import { TeamsContext, TeamsObject } from "../context/teamContext";

export const Layout = () => {
  const state = useAppContext();
  const { config, setConfig } = state.configContext;
  const [isGenerated, setIsGenerated] = state.isGenerated;
  const [teams, setTeams] = useState<TeamsObject[]>([]);
  const router = useRouter();
  const teamsFormat = useAppContext().teamsFormatNameOptions;
  const { setTeamsFormatName } = useAppContext().teamsFormatNameTemporary;

  useEffect(() => {
    if (config.isReset) {
      setConfig({
        isReset: false,
        teamsFormatName: "default",
        numberOfTeams: 2,
        isFromShareLink: false,
      });
      setTeams([]);
      setIsGenerated(false);
      router.push("/");
    }
    if (router.query && Object.keys(router.query).length > 0) {
      const { teams, formatName } = router.query as {
        teams: string[];
        formatName: string;
      };

      const teamsNameFromQuery = teams.map((team) => {
        return {
          name: JSON.parse(team).name,
          emoji: JSON.parse(team).emoji,
        };
      });
      setTeamsFormatName({
        title: "temporary",
        list: teamsNameFromQuery,
      });

      const formattedTeams = teams!.map((team) => {
        return {
          name: JSON.parse(team).name,
          players: JSON.parse(team).players,
          uuid: JSON.parse(team).uuid,
          emoji: JSON.parse(team).emoji,
        };
      }) as TeamsObject[];
      setConfig({
        isReset: config.isReset,
        teamsFormatName: JSON.parse(formatName),
        numberOfTeams: formattedTeams.length,
        isFromShareLink: true,
      });
      setTeams(formattedTeams);
      setIsGenerated(true);
    }
  }, [
    config.isFromShareLink,
    config.isReset,
    isGenerated,
    router,
    router.query,
    setConfig,
    setIsGenerated,
    setTeamsFormatName,
    teamsFormat,
  ]);

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
          {!isGenerated || config.isReset ? (
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
