import styled from '@emotion/styled';
import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  subTotalState,
  playerTurnState,
  possibleState,
  scoreState,
  bonusState,
  totalScoreState,
} from '../utils/store';
import Score from './Score';

import Title from './Title';

const topNames: Array<string> = [
  'Aces',
  'Deuces',
  'Threes',
  'Fours',
  'Fives',
  'Sixes',
];
const bottomNames: Array<string> = [
  '4 of a Kind',
  'Full House',
  'S. Straight',
  'L. Straight',
  'Yacht',
];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function ScoreBoard() {
  const scores = useRecoilValue(scoreState);
  const possibleScore = useRecoilValue(possibleState);
  const turn = useRecoilValue(playerTurnState);
  const subTotal = useRecoilValue(subTotalState);
  const bonus = useRecoilValue(bonusState);
  const totalScore = useRecoilValue(totalScoreState);
  const displayScores = Array(2);
  for (let i = 0; i < 2; i += 1)
    displayScores[i] = scores[i].map((score, index) => {
      if (score !== null) {
        return {
          score,
          real: true,
        };
      }
      if (turn === i) {
        return {
          score: possibleScore[index],
          real: false,
        };
      }
      return {
        score: null,
        real: false,
      };
    });

  return (
    <Container>
      <div>
        <Categories>
          <Titles>
            <div>Categories</div>
          </Titles>
          <First>P1</First>
          <Second>P2</Second>
        </Categories>
        <Top>
          <Titles>
            {topNames.map((name, index) => (
              <Title title={name} index={index} />
            ))}
          </Titles>
          <First>
            {displayScores[0].slice(0, 6).map((score, index) => (
              <Score
                column={0}
                score={score.score}
                real={score.real}
                index={index}
              />
            ))}
          </First>
          <Second>
            {displayScores[1].slice(0, 6).map((score, index) => (
              <Score
                column={1}
                score={score.score}
                real={score.real}
                index={index}
              />
            ))}
          </Second>
        </Top>
        <Bonus>
          <Titles>
            <div>Subtotal</div>
            <div>+35 Bounus</div>
          </Titles>
          <First>
            <Threshold>{`${subTotal[0]}/63`}</Threshold>
            <div>{bonus[0] ? '35' : '0'}</div>
          </First>
          <Second>
            <Threshold>{`${subTotal[1]}/63`}</Threshold>
            <div>{bonus[1] ? '35' : '0'}</div>
          </Second>
        </Bonus>
      </div>
      <Margin>Bonus if 1~6 are over 63 points</Margin>
      <Choice>
        <Titles>
          <Title title="Choice" index={0} />
        </Titles>
        <First>
          <Score
            column={0}
            score={displayScores[0][6].score}
            real={displayScores[0][6].real}
            index={6}
          />
        </First>
        <Second>
          <Score
            column={1}
            score={displayScores[1][6].score}
            real={displayScores[1][6].real}
            index={6}
          />
        </Second>
      </Choice>
      <Margin />
      <Bottom>
        <Titles>
          {bottomNames.map((name, index) => (
            <Title title={name} index={index} />
          ))}
        </Titles>
        <First>
          {displayScores[0].slice(7, 12).map((score, index) => (
            <Score
              column={0}
              score={score.score}
              real={score.real}
              index={7 + index}
            />
          ))}
        </First>
        <Second>
          {displayScores[1].slice(7, 12).map((score, index) => (
            <Score
              column={1}
              score={score.score}
              real={score.real}
              index={7 + index}
            />
          ))}
        </Second>
      </Bottom>
      <Margin />
      <Total>
        <Titles>
          <TotalTitle>Total</TotalTitle>
        </Titles>
        <First>{totalScore[0]}</First>
        <Second>{totalScore[1]}</Second>
      </Total>
    </Container>
  );
}

export default ScoreBoard;

const Container = styled.div`
  z-index: 4;
  width: 90%;
  max-width: 350px;
  height: 85vh;
  max-height: 650px;
  padding: 10px;
  color: #111;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.4);
  background-color: #fff6ec;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media all and (max-width: 599px) {
    font-size: 0.8em;
    height: 77vh;
  }
`;

const Categories = styled.div`
  border: 4px solid #333;
  border-bottom: 2px solid #333;
  display: flex;
  & > * {
  }
  & > :nth-child(1) > * {
    padding: 5px;
    color: #fff6ec;
    font-size: 1.2em;
  }
  & > :nth-child(1) {
    background-color: #333;
  }
`;

const Top = styled.div`
  border: 4px solid #333;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  display: flex;
`;
const Bonus = styled.div`
  border: 4px solid #333;
  border-top: none;
  display: flex;

  & > * {
    background-color: #888;
  }
  & > :nth-child(1) {
    background-color: #333;
  }
  & > * > * {
    padding: 4px;
  }
  & > * > :nth-child(2) {
    font-size: 1.2em;
  }
  & > * > :nth-child(1) {
    border-bottom: 2px dashed #e9e0d6;
    width: 100%;
  }
  color: #fff6ec;
`;
const Choice = styled.div`
  border: 4px solid #333;
  display: flex;
`;
const Bottom = styled.div`
  border: 4px solid #333;
  display: flex;
`;
const Total = styled.div`
  border: 4px solid #333;
  display: flex;
  & > * {
    font-weight: 900;
    font-size: 1.2em;
  }
`;

const Threshold = styled.div``;

const Titles = styled.div`
  min-height: 20px;
  width: 200%;
  display: flex;
  flex-direction: column;
`;
const First = styled.div`
  min-height: 20px;
  border-left: 2px #333 solid;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Second = styled.div`
  min-height: 20px;
  border-left: 2px #333 solid;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TotalTitle = styled.h2`
  padding: 5px;
  background-color: #333;
  font-size: 1.2em;
  color: #fff6ec;
`;

const Margin = styled.div`
  font-size: 0.9em;
  margin-top: 2px;
  margin-bottom: 6px;
`;
