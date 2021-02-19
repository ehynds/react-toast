import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Toast } from './types';

const positionMap = {
  'top-left': 'flex-start',
  'top-center': 'center',
  'top-right': 'flex-end',
};

const Card = styled.div`
  text-align: center;
  width: 400px;
  border-radius: 6px;
  line-height: 1.2;
  padding: 20px;
  margin-bottom: 12px;
  background-color: #6c757d;
  color: #fff;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

type ToastCardProps = {
  toast: Toast;
  onDismiss: () => void;
};

export const ToastCard: FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const [rendered, setRendered] = useState(true);
  const startShowAnimation = () => setRendered(true);
  const startHideAnimation = () => setRendered(false);

  const { type, message, options } = toast;
  const { autoHide, autoHideDuration, styles, position } = options;

  useEffect(() => {
    startShowAnimation();
    const timeout =
      autoHide && setTimeout(() => startHideAnimation(), autoHideDuration);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const onAnimationEnd = () => {
    if (!rendered) {
      onDismiss();
    }
  };

  const onClick = () => {
    options.onClick?.({ dismiss: startHideAnimation });
  };

  const style = {
    ...styles?.[type],
    alignSelf: positionMap[position],
    animation: `${rendered ? 'fadeIn' : 'fadeOut'} 0.2s`,
    cursor: options.onClick ? 'pointer' : 'default',
  };

  return (
    <Card style={style} onClick={onClick} onAnimationEnd={onAnimationEnd}>
      {message}
    </Card>
  );
};
