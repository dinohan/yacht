import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';

interface NameProps {
  title: string;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Name({ title, index }: NameProps) {
  return (
    <Container style={{ borderTop: index && '2px solid #111' }}>
      {title}
    </Container>
  );
}

export default Name;

const Container = styled.div`
  padding-left: 6px;
  height: 35px;
  display: flex;
  align-items: center;
  font-weight: 700;
`;
