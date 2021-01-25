import styled from '@emotion/styled';
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getSpecialScores } from '../utils';

import {
  actionState,
  diceState,
  playerTurnState,
  possibleState,
  rollCountState,
  scoreState,
  specialState,
} from '../utils/store';
import Dice from './Dice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Board() {
  const [dices, setDices] = useRecoilState(diceState);
  const [rollCount, setRollCount] = useRecoilState(rollCountState);
  const setActionState = useSetRecoilState(actionState);

  async function rollDices() {
    const promise = new Promise((resolve) => {
      for (let i = 0; i < 10; i += 1)
        setTimeout(() => {
          setDices(
            dices.map((dice) => {
              if (dice.fixed) return dice;
              return {
                num: Math.floor(Math.random() * 6) + 1,
                fixed: false,
                order: dice.order,
              };
            }),
          );
        }, 100 * i);
      const newArr = dices.map((dice) => {
        if (dice.fixed) return dice;
        return {
          num: Math.floor(Math.random() * 6) + 1,
          fixed: false,
          order: dice.order,
        };
      });
      setTimeout(() => resolve(newArr), 1000);
    });
    const newDices = await promise;
    return newDices;
  }

  function getNewDices(newDices) {
    const orderedDices = [...newDices]
      .sort((a, b) => a.num - b.num)
      .map((dice, index) => ({ ...dice, order: index }));
    const newOrderedDices = newDices.map((dice) => {
      for (let i = 0; i < orderedDices.length; i += 1) {
        if (
          dice.num === orderedDices[i].num &&
          dice.fixed === orderedDices[i].fixed
        ) {
          const { order } = orderedDices[i];
          orderedDices.splice(i, 1);
          return { ...dice, order };
        }
      }
      return dice;
    });
    return newOrderedDices;
  }

  const [special, setSpecial] = useRecoilState(specialState);
  const scores = useRecoilValue(scoreState);
  const turn = useRecoilValue(playerTurnState);

  function displaySpecial(dices) {
    const diceNums = dices.map((dice) => dice.num).sort((a, b) => a - b);
    const specialScores = getSpecialScores(
      diceNums,
      diceNums.reduce((acc, cur) => acc + cur, 0),
      new Set(diceNums).size,
    );
    if (specialScores[4] && !scores[turn][11]) {
      setSpecial('Yacht!');
    } else if (specialScores[0] && !scores[turn][7]) {
      setSpecial('4 of a Kind!');
    } else if (specialScores[1] && !scores[turn][8]) {
      setSpecial('Full House');
    } else if (specialScores[3] && !scores[turn][10]) {
      setSpecial('L. Straight!');
    } else if (specialScores[2] && !scores[turn][9]) {
      setSpecial('S. Straight!');
    }

    setTimeout(() => {
      setSpecial('');
    }, 1000);
  }

  function handleClick() {
    setActionState(true); // dice 돌리는 동안 점수 체크 못하게
    rollDices() // 1초 동안 막 돌리고 새 배열 받아서
      .then(getNewDices) // 새 배열 정렬해서
      .then((args) => {
        setDices(args);
        return args;
      }) // 적용
      .then(displaySpecial)
      .then(() => setActionState(false)); // 완료 후 점수 체크 가능하도록
    setRollCount(rollCount + 1);
  }

  return (
    <Container>
      <Dices>
        {dices.map((dice, index) => (
          <Dice index={index} />
        ))}
      </Dices>

      <Roll>
        <Count>{rollCount}/3</Count>
        {rollCount < 3 ? (
          <Button type="button" onClick={handleClick}>
            Roll!!
          </Button>
        ) : (
          <DeactivateButton type="button">Choose</DeactivateButton>
        )}
      </Roll>
    </Container>
  );
}

export default Board;
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 2px red solid;
`;

const Dices = styled.ul`
  transition-duration: 0.5s;
  height: 10vw;
  // border: 2px red solid;
`;

const Roll = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;

  // border: 2px yellow solid;
`;
const Count = styled.div`
  margin-right: 20px;
  font-size: 2em;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.5);
`;
const Button = styled.button`
  font-size: 1.5em;
  font-weight: 900;
  color: #eee;
  padding: 10px 20px;
  border-radius: 100px;
  border: 4px solid #eee;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #e4ce9c;
    background-color: #eee;
  }
`;
const DeactivateButton = styled.button`
  font-size: 1.5em;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 100px;
  border: 4px solid rgba(0, 0, 0, 0.5);
  background-color: transparent;
`;
