import { atom, selector } from 'recoil';
import { getSpecialScores } from '.';

export const diceState = atom({
  key: 'diceState',
  default: [
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
  ],
});

export const scoreState = atom<(number | null)[][]>({
  key: 'scoreState',
  default: [
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
  ],
});

export const subTotalState = selector<number[]>({
  key: 'subTotalState',
  get: ({ get }) => {
    const score = get(scoreState);
    const player1 = score[0].slice(0, 6).reduce((acc, cur) => {
      if (cur === null) return acc;
      if (acc === null) return 0;
      return acc + cur;
    }, 0);
    const player2 = score[1].slice(0, 6).reduce((acc, cur) => {
      if (cur === null) return acc;
      if (acc === null) return 0;
      return acc + cur;
    }, 0);
    return [player1 === null ? 0 : player1, player2 === null ? 0 : player2];
  },
});

export const bonusState = selector<boolean[]>({
  key: 'bonusState',
  get: ({ get }) => {
    const subTotal = get(subTotalState);
    return [subTotal[0] >= 63, subTotal[1] >= 63];
  },
});

export const totalScoreState = selector<number[]>({
  key: 'totalScoreState',
  get: ({ get }) => {
    const score = get(scoreState);
    const bonus = get(bonusState);
    let player1 = score[0].reduce((acc, cur) => {
      if (acc === null) return 0;
      if (cur === null) return acc;
      return acc + cur;
    }, 0);
    let player2 = score[1].reduce((acc, cur) => {
      if (acc === null) return 0;
      if (cur === null) return acc;
      return acc + cur;
    }, 0);
    if (player1 === null) player1 = 0;
    if (player2 === null) player2 = 0;
    player1 += bonus[0] ? 35 : 0;
    player2 += bonus[1] ? 35 : 0;
    return [player1, player2];
  },
});

export const possibleState = selector<number[]>({
  key: 'possibleState',
  get: ({ get }) => {
    // 족보 계산하는 알고리즘
    const curDices = get(diceState);
    const dices = [...curDices].map((dice) => dice.num).sort((a, b) => a - b);
    const rollCount = get(rollCountState);
    const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (rollCount === 0) return scores;
    let sum = 0;
    dices.forEach((dice) => {
      sum += dice;
      scores[dice - 1] += dice;
    });
    scores[6] = sum;
    const kinds = new Set(dices.map((dice) => dice));
    const specialScore = getSpecialScores([...dices], sum, kinds.size);
    specialScore.forEach((score, index) => {
      scores[7 + index] = score;
    });
    return scores;
  },
});

export const playerTurnState = atom<number>({
  key: 'playerTurnState',
  default: 0,
});
export const rollCountState = atom<number>({
  key: 'rollCountState',
  default: 0,
});
export const rountState = atom<number>({
  key: 'rountState',
  default: 1,
});

export const actionState = atom<boolean>({
  key: 'actionState',
  default: false,
});
export const specialState = atom<string>({
  key: 'specialState',
  default: '',
});
