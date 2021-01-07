export const ship = (shipLength, playerName) => {
  const length = shipLength;
  const belongsTo = playerName || "none";
  let _hits = 0;
  let hit = () => (_hits += 1);
  const isSunk = () => (_hits === length ? true : false);
  return { length, belongsTo, hit, isSunk };
};
