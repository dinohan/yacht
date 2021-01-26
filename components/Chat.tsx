import styled from '@emotion/styled';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Chat() {
  return (
    <Container>
      <ChatBox></ChatBox>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: white;
`;

const ChatBox = styled.div`
  position: absolute;
  width: 90%;
  max-width: 500px;
  height: 90%;
  // top: 50%;
  left: 50%;
  transform: translateX(-50%);

  border-radius: 15px;
  // border: 1px solid black;
`;
