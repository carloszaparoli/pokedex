export const calculateStatRange = (baseStat: number, isHP: boolean) => {
  const IV = 31;
  const EV = 252;
  const level = 100;
  const nature = 1.1; // 10%

  if (isHP) {
    return {
      min: Math.floor(0.01 * (2 * baseStat) * level) + level + 10,
      max:
        Math.floor(0.01 * (2 * baseStat + IV + Math.floor(EV / 4)) * level) +
        level +
        10,
    };
  }

  const calcMinStat = Math.floor(0.01 * (2 * baseStat) * level + 5);
  const differenceNature = calcMinStat * (nature - 1);

  return {
    min: Math.floor(calcMinStat - differenceNature),
    max: Math.floor(
      (0.01 * (2 * baseStat + IV + Math.floor(EV / 4)) * level + 5) * nature
    ),
  };
};
