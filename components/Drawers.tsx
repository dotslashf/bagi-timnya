import { useAppContext } from "../context/state";
import Drawer from "./Drawer";
import FormConfig from "./FormConfig";

const Drawers = () => {
  const state = useAppContext();
  const [playersName, setPlayersName] = state.playersName;

  return (
    <div className="w-full pt-8">
      <div className="mx-auto w-full space-y-2">
        <Drawer title="Pemain" emoji="👥" defaultOpen={true}>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            List Nama Pemain / Pisah dengan baris baru
          </label>
          <textarea
            id="message"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder={playersName.join("\n")}
            onChange={(e) => setPlayersName(e.target.value.split("\n"))}
          ></textarea>
        </Drawer>
        <Drawer title="Konfigurasi" emoji="⚙️">
          <FormConfig />
        </Drawer>
      </div>
    </div>
  );
};

export default Drawers;
