import { HTMLProps, useState } from "react";
import TeamNameEmojiPicker from "./TeamNameEmojiPicker";

interface Card extends HTMLProps<HTMLDivElement> {
  players: string[] | string;
  teamName: string;
  emoji?: string;
  uuid?: string;
}

const Card = ({ players, teamName, emoji, uuid, ...props }: Card) => {
  const [showTeamNameEmojiPicker, setShowTeamNameEmojiPicker] = useState(false);

  return (
    <div className="flex flex-col group" {...props}>
      <div className="flex items-center justify-between rounded-t-lg border p-3 sm:px-6 sm:py-4 shadow-sm bg-slate-100 group-hover:bg-slate-200 transition-colors">
        <h5 className="text-xl font-bold leading-none text-gray-900 cursor-default flex overflow-x-clip">
          <p className="mr-1 inline-block bg-slate-400 rounded-md py-0.5 px-2 text-xs font-bold text-white">
            {`${players.length}`}
          </p>
          <p className="flex">
            <span
              onClick={() => setShowTeamNameEmojiPicker(true)}
              className="text-md mr-1 cursor-pointer"
            >
              {emoji && `${emoji}`}
            </span>
            <TeamNameEmojiPicker
              show={showTeamNameEmojiPicker}
              onSetShowEmojiPicker={setShowTeamNameEmojiPicker}
              uuid={uuid || ""}
            />
            {teamName}
          </p>
        </h5>
      </div>
      <div className="w-full max-w-xs bg-white border border-t-0 rounded-b-lg shadow-md p-3 sm:px-6 sm:py-4">
        <ul role="list" className="divide-y divide-gray-200">
          {typeof players === "string" ? (
            <li className="py-2">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{players}</p>
                </div>
              </div>
            </li>
          ) : (
            players.map((player, i) => {
              let padding = "py-2";
              if (i === 0 && players.length > 1) {
                padding = "pb-2";
              }
              if (i === players.length - 1 && players.length > 1) {
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
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Card;
