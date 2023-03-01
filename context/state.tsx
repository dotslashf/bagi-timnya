import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { Config } from "../@types/Config";
import { TeamUtils } from "../utils/TeamUtils";

interface GlobalState {
  playerContext: {
    playersName: string[];
    setPlayersName: Dispatch<React.SetStateAction<string[]>>;
  };
  configContext: {
    config: Config;
    setConfig: Dispatch<React.SetStateAction<Config>>;
  };
  isGenerated: [boolean, Dispatch<React.SetStateAction<boolean>>];
  teamsHash: [
    { [key: string]: string[] } | undefined,
    React.Dispatch<
      React.SetStateAction<{ [key: string]: string[] } | undefined>
    >,
  ];
  teamsFormatNameOptions: {
    [key: string]: {
      title: string;
      list: {
        emoji?: string;
        name: string;
      }[];
    };
  };
  teamsFormatNameTemporary: {
    teamsFormatName: {
      title: string;
      list: {
        emoji?: string;
        name: string;
      }[];
    };
    setTeamsFormatName: React.Dispatch<
      React.SetStateAction<{
        title: string;
        list: {
          emoji?: string;
          name: string;
        }[];
      }>
    >;
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
      .map((_, i) => {
        return {
          name: `${i}`,
        };
      }),
  },
  default: {
    title: "Default",
    list: Array(20)
      .fill("")
      .map((_, i) => {
        return {
          name: `${i}`,
        };
      }),
  },
  fruitsAndFoods: {
    title: "Buah/Makan",
    list: [
      {
        emoji: "🍎",
        name: "Apple",
      },
      {
        emoji: "🍌",
        name: "Banana",
      },
      {
        emoji: "🍇",
        name: "Grapes",
      },
      {
        emoji: "🍉",
        name: "Watermelon",
      },
      {
        emoji: "🍍",
        name: "Pineapple",
      },
      {
        emoji: "🍓",
        name: "Strawberry",
      },
      {
        emoji: "🍒",
        name: "Cherry",
      },
      {
        emoji: "🍑",
        name: "Peach",
      },
      {
        emoji: "🍐",
        name: "Pear",
      },
      {
        emoji: "🍋",
        name: "Lemon",
      },
      {
        emoji: "🍊",
        name: "Orange",
      },
      {
        emoji: "🍈",
        name: "Melon",
      },
      {
        emoji: "🍏",
        name: "Green Apple",
      },
      {
        emoji: "🍆",
        name: "Eggplant",
      },
      {
        emoji: "🍅",
        name: "Tomato",
      },
      {
        emoji: "🥑",
        name: "Avocado",
      },
      {
        emoji: "🥝",
        name: "Kiwi",
      },
      {
        emoji: "🥥",
        name: "Coconut",
      },
      {
        emoji: "🥦",
        name: "Broccoli",
      },
      {
        emoji: "🥬",
        name: "Cabbage",
      },
    ],
  },
  flags: {
    title: "Bendera",
    list: [
      {
        emoji: "🇯🇵",
        name: "Japan",
      },
      {
        emoji: "🇮🇩",
        name: "Indonesia",
      },
      {
        emoji: "🇺🇸",
        name: "USA",
      },
      {
        emoji: "🇰🇷",
        name: "Korea",
      },
      {
        emoji: "🇨🇳",
        name: "China",
      },
      {
        emoji: "🇮🇳",
        name: "India",
      },
      {
        emoji: "🇷🇺",
        name: "Russia",
      },
      {
        emoji: "🇧🇷",
        name: "Brazil",
      },
      {
        emoji: "🇬🇧",
        name: "UK",
      },
      {
        emoji: "🇫🇷",
        name: "France",
      },
      {
        emoji: "🇪🇸",
        name: "Spain",
      },
      {
        emoji: "🇩🇪",
        name: "Germany",
      },
      {
        emoji: "🇮🇹",
        name: "Italy",
      },
      {
        emoji: "🇨🇦",
        name: "Canada",
      },
      {
        emoji: "🇦🇺",
        name: "Australia",
      },
      {
        emoji: "🇳🇿",
        name: "New Zealand",
      },
      {
        emoji: "🇳🇱",
        name: "Netherlands",
      },
      {
        emoji: "🇵🇱",
        name: "Poland",
      },
      {
        emoji: "🇹🇷",
        name: "Turkey",
      },
      {
        emoji: "🇵🇭",
        name: "Philippines",
      },
      {
        emoji: "🇲🇽",
        name: "Mexico",
      },
      {
        emoji: "🇵🇰",
        name: "Pakistan",
      },
      {
        emoji: "🇮🇷",
        name: "Iran",
      },
      {
        emoji: "🇹🇭",
        name: "Thailand",
      },
    ],
  },
  animals: {
    title: "Hewan",
    list: [
      { emoji: "🐶", name: "Dog" },
      { emoji: "🐱", name: "Face Cat" },
      { emoji: "🐭", name: "Mouse" },
      { emoji: "🐹", name: "Hamster" },
      { emoji: "🐰", name: "Rabbit" },
      { emoji: "🦊", name: "Fox" },
      { emoji: "🐻", name: "Bear" },
      { emoji: "🐼", name: "Panda" },
      { emoji: "🐨", name: "Koala" },
      { emoji: "🐯", name: "Tiger" },
      { emoji: "🦁", name: "Lion" },
      { emoji: "🐮", name: "Cow" },
      { emoji: "🐷", name: "Pig" },
      { emoji: "🐸", name: "Frog" },
      { emoji: "🐵", name: "Monkey" },
      { emoji: "🐔", name: "Chicken" },
      { emoji: "🐧", name: "Penguin" },
      { emoji: "🐦", name: "Bird" },
      { emoji: "🦀", name: "Crab" },
      { emoji: "🦋", name: "Butterfly" },
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
  const teamUtils: TeamUtils = new TeamUtils();
  const [isGenerated, setIsGenerated] = useState(false);
  const [teamsHash, setTeamsHash] = useState<{ [key: string]: string[] }>();
  const [config, setConfig] = useState<Config>({
    numberOfTeams: 2,
    teamsFormatName: "placeholder",
  });
  const [playersName, setPlayersName] = useState<Array<string>>([]);
  const [teamsFormatNameTemporary, setTeamsFormatNameTemporary] = useState<{
    title: string;
    list: {
      emoji?: string;
      name: string;
    }[];
  }>({ list: [], title: "temporary" });

  useEffect(() => {
    setConfig({ ...config, isFromLocalStorage: true });
    const playersNameFromLocalStorage = teamUtils.read();
    if (playersNameFromLocalStorage) {
      const listName: string[] = playersNameFromLocalStorage
        .map((item) => item.players)
        .flat();
      setPlayersName(listName);
    }
  }, []);

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
    teamsFormatNameTemporary: {
      teamsFormatName: teamsFormatNameTemporary,
      setTeamsFormatName: setTeamsFormatNameTemporary,
    },
  };

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
