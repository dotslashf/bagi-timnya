export interface TeamsObject {
  uuid: string;
  name: string;
  players: string[];
  // TODO: add emoji and score
  emoji?: string;
  score?: number;
}
