import styled from '@emotion/styled';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Board from '../components/Board';
import Chat from '../components/Chat';
import ScoreBoard from '../components/ScoreBoard';
import TopBar from '../components/TopBar';
import { specialState } from '../utils/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Index() {
  const special = useRecoilValue(specialState);
  return (
    <Container>
      <TopBar />
      <Left>
        <ScoreBoard />
      </Left>
      <Right>
        <PlaceHolder />
        <Board />
        <Chat />
        <Special>{special}</Special>
      </Right>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  height: 100vh;
`;
const Left = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  min-width: 300px;
  max-width: 420px;
  transition-duration: 0.8s;
  @media all and (max-width: 899px) {
    transform: translateX(-80%);
    position: fixed;
    width: 50vw;
    &:hover {
      transform: translateX(0);
    }
  }
`;

const Right = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  // border: 2px yellow solid;
  @media all and (max-width: 899px) {
    margin-left: 60px;
  }
`;
const PlaceHolder = styled.div`
  width: 100%;
  height: 120px;
  // background-color: black;
`;
const Special = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  font-weight: 900;
  font-size: 4vw;
  @media all and (max-width: 899px) {
    font-size: 7vw;
  }
`;
