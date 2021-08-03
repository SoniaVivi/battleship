export const ship = (shipInitial, shipLength, playerName) => {
  const length = shipLength;
  let belongsTo = () => _belongsTo;
  const setOwner = (owner) => (_belongsTo = owner);

  let _hits = 0;
  let hit = () => (_hits += 1);
  const getHits = () => _hits;

  const isSunk = () => (_hits === length ? true : false);
  const initial = shipInitial;
  let _belongsTo = playerName || "none";
  return { length, belongsTo, hit, isSunk, initial, getHits, setOwner };
};
