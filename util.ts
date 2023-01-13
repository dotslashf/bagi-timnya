export function getRandomFromArray(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const selected = arr[randomIndex];
  arr.splice(randomIndex, 1);
  return selected;
}

export function randomTeamsName(arr: string[], max: number) {
  return Array.from(
    { length: max },
    () => arr[Math.floor(Math.random() * arr.length)]
  );
}

export function shuffleArray(arr: string[]) {
  return arr.sort(() => Math.random() - 0.5);
}
