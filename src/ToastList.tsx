import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import { Toast } from './types';
import { ToastCard } from './ToastCard';

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 15px;
  display: flex;
  flex-direction: column;
`;

type ToastListProps = {
  toasts: Toast[];
  style?: CSSProperties;
  className?: string;
  onDismiss: (toast: Toast) => void;
};

export const ToastList: FC<ToastListProps> = ({
  toasts,
  style,
  className,
  onDismiss,
}) => {
  return (
    <Container style={style} className={className}>
      {toasts.map((toast) => (
        <ToastCard
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast)}
        />
      ))}
    </Container>
  );
};
