import React from "react";
import Card from "./Card";

interface Cards {
  teams: { [key: string]: string[] };
}

const Cards = ({ teams }: Cards) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Object.keys(teams).map((team) => {
        const players = teams[team];
        return <Card players={players} teamName={team} key={team} />;
      })}
    </div>
  );
};

export default Cards;
