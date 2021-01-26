import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  actionState,
  diceState,
  playerTurnState,
  rollCountState,
  rountState,
  scoreState,
} from '../utils/store';
import { initDice } from '../utils';

interface ScoreProps {
  score: number | null;
  index: number;
  real: boolean;
  column: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Score({ score, index, real, column }: ScoreProps) {
  const [globalScore, setScore] = useRecoilState(scoreState);
  const [turn, setTurn] = useRecoilState(playerTurnState);
  const [rollCount, setRollCount] = useRecoilState(rollCountState);
  const [round, setRoundState] = useRecoilState(rountState);
  const setDices = useSetRecoilState(diceState);
  const action = useRecoilValue(actionState);

  function handleClick() {
    if (real) return; // 이미 기입된 칸에는 클릭 불가
    if (column !== turn) return; // 내 턴이 아니면 클릭 불가
    if (action) return; // 주사위가 돌아가는 중에는 클릭 불가
    if (!rollCount) return; // 주사위 한 번도 안 굴려도 클릭 불가
    if (turn === 1) setRoundState(round + 1); // player2가 선택하면 라운드++
    const newArr = [[...globalScore[0]], [...globalScore[1]]];
    newArr[turn][index] = score;
    setScore(newArr);
    setTurn(turn ? 0 : 1);
    setDices(initDice);
    setRollCount(0);
  }

  let styles = {
    borderTop: '',
    color: '',
    backgroundColor: '',
    cursor: '',
  };
  if (index && index !== 6 && index !== 7) styles.borderTop = '2px solid #111';
  if (!real) styles.color = '#9c9c9c';
  if (turn === column) {
    styles.backgroundColor = '#f7e9bc';
    styles.cursor = 'pointer';
  } else {
    styles.backgroundColor = 'transparent';
    styles.cursor = 'default';
  }

  return (
    <Container style={{ ...styles }} onClick={handleClick}>
      {score}
    </Container>
  );
}

export default Score;

const Container = styled.div`
  width: 100%;
  padding: 6px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  @media all and (max-width: 599px) {
    height: 30px;
  }
`;
