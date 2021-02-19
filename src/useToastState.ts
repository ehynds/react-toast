import { useState } from 'react';
import { ToastType, Toast, ToastOptions, MaybeToastOptions } from './types';

const generateId = (len = 20) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => dec.toString(16).padStart(2, '0')).join('');
};

type UseToastState = {
  toasts: Toast[];
  append: (
    type: ToastType,
    message: string,
    options?: MaybeToastOptions
  ) => void;
  remove: (toast: Toast) => void;
  clear: () => void;
};

export const useToastState = (defaultOptions: ToastOptions): UseToastState => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = (
    type: ToastType,
    message: string,
    options?: MaybeToastOptions
  ) => ({
    id: generateId(),
    type,
    message,
    options: {
      ...defaultOptions,
      ...options,
    },
  });

  const append = (
    type: ToastType,
    message: string,
    options?: MaybeToastOptions
  ) =>
    setToasts((toasts) => {
      const toast = createToast(type, message, options);
      return [...toasts, toast];
    });

  const remove = (toast: Toast) =>
    setToasts((toasts) => toasts.filter((t) => t !== toast));

  const clear = () => setToasts([]);

  return {
    toasts,
    append,
    remove,
    clear,
  };
};
