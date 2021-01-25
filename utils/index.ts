export const initDice = [
  {
    num: 5,
    fixed: false,
    order: 0,
  },
  {
    num: 5,
    fixed: false,
    order: 1,
  },
  {
    num: 5,
    fixed: false,
    order: 2,
  },
  {
    num: 5,
    fixed: false,
    order: 3,
  },
  {
    num: 5,
    fixed: false,
    order: 4,
  },
];

export function getSpecialScores(
  dices: number[],
  sum: number,
  kinds: number,
): number[] {
  let results = [0, 0, 0, 0, 0];

  if (kinds === 1 && sum !== 0) {
    // Yacht!!
    results[0] = sum;
    results[4] = 50;
    return results;
  }
  if (kinds === 2) {
    // 숫자 종류가 두 가지면 풀하우스랑 포카드밖에 없음.
    const count = dices.filter((dice) => dice === dices[0]).length;
    // 아무 숫자나 똑같은게 4개나 1개 있으면 포카드
    if (count === 1 || count === 4) {
      results[0] = sum;
      return results;
    }
    // 2개나 3개 있으면 풀 하우스
    if (count === 2 || count === 3) {
      results[1] = sum;
      return results;
    }
  }
  // console.log(kinds);
  if (kinds >= 4) {
    // 숫자 종류가 5가지이고 1이나 6중에 하나만 있으면 L.straight
    let count = 1;
    let max = 1;
    let pre = dices[0];
    for (let i = 1; i < 5; i += 1) {
      const diff = dices[i] - pre;
      if (diff === 1) {
        count += 1;
      }
      if (dices[i] - pre >= 2) count = 1;
      max = count > max ? count : max;
      pre = dices[i];
    }
    if (max === 5) {
      results[2] = 15;
      results[3] = 30;
    } else if (max === 4) results[2] = 15;
  }
  return results;
}
