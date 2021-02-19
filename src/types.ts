import { CSSProperties } from 'react';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export type ToastContainerOptions = {
  target: Element;
  className?: string;
  style?: CSSProperties;
};

export type MaybeToastContainerOptions = Partial<ToastContainerOptions>;

export type ToastOptions = {
  autoHide: boolean;
  autoHideDuration: number;
  position: ToastPosition;
  className?: string;
  styles?: { [key in ToastType]: CSSProperties };
  onClick?: (opts: { dismiss: () => void }) => void;
};

export type MaybeToastOptions = Partial<ToastOptions>;

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  options: ToastOptions;
};

export type ToastContext = {
  success: (message: string, options?: MaybeToastOptions) => void;
  error: (message: string, options?: MaybeToastOptions) => void;
  info: (message: string, options?: MaybeToastOptions) => void;
};

export type ToastProviderProps = {
  containerOptions?: MaybeToastContainerOptions;
  toastOptions?: MaybeToastOptions;
};
