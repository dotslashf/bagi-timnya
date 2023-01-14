import { useContext, useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import Drawer from "./Drawer";
import FormConfig from "./FormConfig";

const Drawers = () => {
  const state = useAppContext();
  const { playersName, setPlayersName } = state.playerContext;
  const [players, setPlayers] = useState(playersName);

  useEffect(() => {
    setPlayersName(players);
  }, [players, setPlayersName]);

  return (
    <div className="w-full md:pt-8 pt-4">
      <div className="mx-auto w-full space-y-2">
        <Drawer title="Pemain" emoji="👥" defaultOpen={true}>
          <label
            htmlFor="message"
            className="flex mb-2 text-md font-medium text-gray-900"
          >
            List Nama Pemain{" "}
            <span className="ml-1 bg-red-400 text-white rounded-md py-0.5 px-1 text-xs">
              Pisah dengan baris baru
            </span>
          </label>
          <textarea
            id="message"
            rows={5}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-300"
            placeholder={`Icikiwir\nAselole\nUjang\nJuan`}
            onChange={(e) => setPlayers(e.target.value.split("\n"))}
            value={playersName.join("\n")}
          />
          <p className="mt-2 text-gray-900">
            Jumlah pemain saat ini: {players.length}
          </p>
        </Drawer>
        <Drawer title="Konfigurasi" emoji="⚙️" defaultOpen={true}>
          <FormConfig />
        </Drawer>
      </div>
    </div>
  );
};

export default Drawers;
