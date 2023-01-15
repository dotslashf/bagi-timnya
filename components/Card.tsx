interface Card {
  players: string[] | string;
  teamName: string;
}

const Card = ({ players, teamName }: Card) => {
  return (
    <div className="flex flex-col group">
      <div className="flex items-center justify-between rounded-t-lg border p-3 sm:px-6 sm:py-4 shadow-sm z-10 bg-slate-100 group-hover:bg-slate-200 transition-colors">
        <h5 className="text-xl font-bold leading-none text-gray-900 cursor-default">
          {teamName}
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
              if (i === 0) {
                padding = "pb-2";
              }
              if (i === players.length - 1) {
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
