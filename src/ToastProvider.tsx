import React, { FC, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
  ToastType,
  ToastContext,
  ToastOptions,
  ToastProviderProps,
  ToastContainerOptions,
} from './types';
import { ToastList } from './ToastList';
import { useToastState } from './useToastState';

const toastContext = createContext<ToastContext>({
  success: () => undefined,
  error: () => undefined,
  info: () => undefined,
});

const defaultContainerOptions: ToastContainerOptions = {
  target: document.body,
};

const defaultToastOptions: ToastOptions = {
  autoHide: true,
  autoHideDuration: 5000,
  position: 'top-center',
  styles: {
    [ToastType.SUCCESS]: {
      backgroundColor: '#198754',
    },
    [ToastType.ERROR]: {
      backgroundColor: '#dc3545',
    },
    [ToastType.INFO]: {
      backgroundColor: '#0d6efd',
    },
  },
};

export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  containerOptions,
  toastOptions,
}) => {
  const mergedContainerOptions: ToastContainerOptions = {
    ...defaultContainerOptions,
    ...containerOptions,
  };

  const mergedToastOptions: ToastOptions = {
    ...defaultToastOptions,
    ...toastOptions,
  };

  const { toasts, append, remove } = useToastState(mergedToastOptions);

  const publicApi: ToastContext = {
    success: (message, options) => append(ToastType.SUCCESS, message, options),
    error: (message, options) => append(ToastType.ERROR, message, options),
    info: (message, options) => append(ToastType.INFO, message, options),
  };

  return (
    <toastContext.Provider value={publicApi}>
      {children}
      {toasts.length > 0 &&
        createPortal(
          <ToastList
            toasts={toasts}
            style={mergedContainerOptions.style}
            className={mergedContainerOptions.className}
            onDismiss={remove}
          />,
          mergedContainerOptions.target
        )}
    </toastContext.Provider>
  );
};

export const useToast = (): ToastContext => {
  return useContext(toastContext);
};
