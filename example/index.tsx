import styled from '@emotion/styled';
import React from 'react';
import { render } from 'react-dom';
import { ToastProvider, useToast } from '../src';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

const Button = styled.button`
  margin: 0 10px;
  font-size: 18px;
`;

const Example = () => {
  const { success, error, info } = useToast();

  const onClickToDismiss = () => {
    info('Click to dismiss', {
      autoHide: false,
      onClick: ({ dismiss }) => dismiss(),
    });
  };

  const onClickPositionTopLeft = () =>
    info('Top left', { position: 'top-left' });

  const onClickPositionTopRight = () =>
    info('Top right', { position: 'top-right' });

  return (
    <Container>
      <Button type="button" onClick={() => success('Example success toast')}>
        Success
      </Button>
      <Button type="button" onClick={() => error('Example error toast')}>
        Error
      </Button>
      <Button type="button" onClick={() => info('Example info toast')}>
        Info
      </Button>
      <Button type="button" onClick={onClickToDismiss}>
        Click to dismiss
      </Button>
      <Button type="button" onClick={onClickPositionTopLeft}>
        Top left position
      </Button>
      <Button type="button" onClick={onClickPositionTopRight}>
        Top right position
      </Button>
    </Container>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <Example />
    </ToastProvider>
  );
};

render(<App />, document.querySelector('#app'));
