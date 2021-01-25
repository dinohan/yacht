import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { diceState, rollCountState } from '../utils/store';

interface DiceProps {
  index: number;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Dice({ index }: DiceProps) {
  const [dices, setDices] = useRecoilState(diceState);
  const rollCount = useRecoilValue(rollCountState);

  function handleClick() {
    if (rollCount === 0) return;
    // when click, toggle the fixed state
    setDices(
      dices.map((dice, i) => {
        if (i === index)
          return { num: dice.num, fixed: !dice.fixed, order: dice.order };
        return dice;
      }),
    );
  }

  const defaultStyle = {
    transform: `translateX(-50%)`,
    color: `#333`,
  };
  const activeStyle = {
    color: dices[index].fixed ? '#f06525' : '#333',
    transform:
      (dices[index].fixed ? 'translateY(-50%)' : 'translateY(0)') +
      `translateX(${dices[index].order * 110 - 270}%)`,
  };
  const diceStyle = rollCount === 0 ? defaultStyle : activeStyle;
  return (
    <Contianer style={{ ...diceStyle }} onClick={handleClick}>
      <Icon num={dices[index].num} />
    </Contianer>
  );
}

export default Dice;

const Contianer = styled.li`
  width: 15%;
  box-sizing: border-box;
  // background-color: white;

  @media all and (max-width: 899px) {
    width: 13vw;
  }
  position: absolute;
  list-style: none;
  transition-duration: 0.5s;
  // color: #333;
  &:hover > * {
    filter: contrast(50%);
  }
  padding: 0;
`;

interface IconProps {
  num: number;
}
function Icon({ num }: IconProps) {
  switch (num) {
    case 1:
      return <FaDiceOne size="100%" />;
    case 2:
      return <FaDiceTwo size="100%" />;
    case 3:
      return <FaDiceThree size="100%" />;
    case 4:
      return <FaDiceFour size="100%" />;
    case 5:
      return <FaDiceFive size="100%" />;
    case 6:
      return <FaDiceSix size="100%" />;
    default:
      return <></>;
  }
}
