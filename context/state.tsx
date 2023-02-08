import { createContext, useContext, useState } from "react";

export interface Config {
  numberOfTeams: number;
  teamsFormatName:
    | "default"
    | "fruits"
    | "flags"
    | "animals"
    | "placeholder"
    | string;
}

interface GlobalState {
  playerContext: {
    playersName: string[];
    setPlayersName: React.Dispatch<React.SetStateAction<string[]>>;
  };
  configContext: {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
  };
  isGenerated: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  teamsHash: [
    { [key: string]: string[] } | undefined,
    React.Dispatch<
      React.SetStateAction<{ [key: string]: string[] } | undefined>
    >
  ];
  teamsFormatNameOptions: {
    [key: string]: {
      title: string;
      list: string[];
    };
  };
}

interface AppWrapperProps {
  children: React.ReactNode;
}

interface PlayersContext {
  playersName: string[];
  setPlayersName: React.Dispatch<React.SetStateAction<string[]>>;
}

const TEAMS_FORMAT_NAME_OPTIONS = {
  placeholder: {
    title: "Pilih format",
    list: Array(20)
      .fill("")
      .map((_, i) => `${i}`),
  },
  default: {
    title: "Default",
    list: Array(20)
      .fill("")
      .map((_, i) => `${i}`),
  },
  fruitsAndFoods: {
    title: "Buah/Makan",
    list: [
      "🍎 Apple",
      "🍌 Banana",
      "🍇 Grapes",
      "🍉 Watermelon",
      "🍍 Pineapple",
      "🍓 Strawberry",
      "🍒 Cherry",
      "🍑 Peach",
      "🍐 Pear",
      "🍋 Lemon",
      "🍊 Orange",
      "🍈 Melon",
      "🍏 Green Apple",
      "🍆 Eggplant",
      "🍅 Tomato",
      "🥑 Avocado",
      "🥝 Kiwi",
      "🥥 Coconut",
      "🥦 Broccoli",
      "🥬 Cabbage",
    ],
  },
  flags: {
    title: "Bendera",
    list: [
      "🇯🇵 Japan",
      "🇮🇩 Indonesia",
      "🇺🇸 USA",
      "🇰🇷 Korea",
      "🇨🇳 China",
      "🇮🇳 India",
      "🇷🇺 Russia",
      "🇧🇷 Brazil",
      "🇬🇧 UK",
      "🇫🇷 France",
      "🇪🇸 Spain",
      "🇩🇪 Germany",
      "🇮🇹 Italy",
      "🇨🇦 Canada",
      "🇦🇺 Australia",
      "🇳🇿 New Zealand",
      "🇳🇱 Netherlands",
      "🇵🇱 Poland",
      "🇹🇷 Turkey",
      "🇵🇭 Philippines",
      "🇲🇽 Mexico",
      "🇵🇰 Pakistan",
      "🇮🇷 Iran",
      "🇹🇭 Thailand",
    ],
  },
  animals: {
    title: "Hewan",
    list: [
      "🐶 Dog",
      "🐱 Face Cat",
      "🐭 Mouse",
      "🐹 Hamster",
      "🐰 Rabbit",
      "🦊 Fox",
      "🐻 Bear",
      "🐼 Panda",
      "🐨 Koala",
      "🐯 Tiger",
      "🦁 Lion",
      "🐮 Cow",
      "🐷 Pig",
      "🐸 Frog",
      "🐵 Monkey",
      "🐔 Chicken",
      "🐧 Penguin",
      "🐦 Bird",
      "🐤 Baby Chick",
      "🐣 Hatching Chick",
      "🐥 Front-Facing Baby Chick",
      "🦆 Duck",
      "🦅 Eagle",
      "🦉 Owl",
      "🦇 Bat",
      "🐺 Wolf",
      "🐗 Boar",
      "🐴 Horse",
      "🦄 Unicorn",
      "🐝 Bee",
      "🐛 Bug",
      "🦋 Butterfly",
      "🐌 Snail",
      "🐚 Shell",
      "🐞 Lady Beetle",
      "🐜 Ant",
      "🕷 Spider",
      "🦂 Scorpion",
      "🦀 Crab",
      "🦑 Squid",
      "🐙 Octopus",
      "🦐 Shrimp",
      "🐠 Fish",
      "🐟 Tropical Fish",
      "🐡 Blowfish",
      "🐬 Dolphin",
      "🦈 Shark",
      "🐳 Whale",
      "🐋 Whale",
      "🐊 Crocodile",
      "🐆 Leopard",
      "🐅 Tiger",
      "🐃 Water Buffalo",
      "🐂 Ox",
      "🐄 Cow",
      "🐪 Camel",
      "🐫 Two-Hump Camel",
      "🐘 Elephant",
      "🦏 Rhinoceros",
      "🦍 Gorilla",
      "🐎 Horse",
      "🐖 Pig",
      "🐐 Goat",
      "🐏 Ram",
      "🐑 Sheep",
      "🐕 Dog",
      "🐩 Poodle",
      "🐈 Cat",
      "🐓 Rooster",
      "🐇 Rabbit",
      "🐁 Mouse",
      "🐀 Rat",
      "🐿 Chipmunk",
      "🐾 Paw Prints",
      "🐉 Dragon",
      "🐲 Dragon Face",
    ],
  },
};

const AppContext = createContext<GlobalState>({} as GlobalState);
const PlayersContext = createContext<PlayersContext>({
  playersName: [],
  setPlayersName: (player) => {
    return player;
  },
} as PlayersContext);

export function AppWrapper({ children }: AppWrapperProps) {
  const [isGenerated, setIsGenerated] = useState(false);
  const [teamsHash, setTeamsHash] = useState<{ [key: string]: string[] }>();
  const [config, setConfig] = useState<Config>({
    numberOfTeams: 2,
    teamsFormatName: "placeholder",
  });
  const [playersName, setPlayersName] = useState<Array<string>>([]);

  const globalState: GlobalState = {
    playerContext: {
      playersName: playersName,
      setPlayersName,
    },
    configContext: {
      config,
      setConfig,
    },
    isGenerated: [isGenerated, setIsGenerated],
    teamsHash: [teamsHash, setTeamsHash],
    teamsFormatNameOptions: TEAMS_FORMAT_NAME_OPTIONS,
  };

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
