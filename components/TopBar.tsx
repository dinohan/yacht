import styled from '@emotion/styled';
import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { rountState } from '../utils/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function TopBar() {
  const round = useRecoilValue(rountState);
  return (
    <Container>
      <Round>Round {round}/12</Round>
      <Icon>
        <BsQuestionCircle size="35px" />
      </Icon>
    </Container>
  );
}

export default TopBar;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
`;

const Round = styled.h1``;

const Icon = styled.div`
  position: absolute;
  right: 20px;

  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;
