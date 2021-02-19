# react-toast

![build status](https://github.com/ehynds/react-toast/workflows/Build/badge.svg)

A deliberately minimal React toast component with an imperative API.

<img src="https://user-images.githubusercontent.com/130820/108565572-e5db8680-72d2-11eb-89b2-29afe15b9ae5.gif" width="400">

## Installation

```bash
$ npm install --save @ehynds/react-toast

# or

$ yarn add @ehynds/react-toast
```

## Usage

```jsx
import { ToastProvider, useToast } from '@ehynds/react-toast';

// Somewhere up high in the tree
const App = () => (
  <ToastProvider>
    <SomeComponent />
  </ToastProvider>
);

const SomeComponent = () => {
  const toast = useToast();

  const onClick = () => {
    toast.success('It worked!');

    // OR:
    // toast.error('Error toast');
    // toast.info('Info toast');
  };

  return <a onClick={onClick}>Show a "success" toast</a>;
};
```

## Options

Pass `containerOptions` to customize the element toasts are rendered into, and pass `toastOptions` to set defaults for all rendered toasts.

```tsx
const containerOptions: Partial<ContainerOptions> = {
  className: 'toast-container'
};

const defaultToastOptions: Partial<ToastOptions> = {
  position: 'top-right
};

<ToastProvider
  containerOptions={containerOptions}
  toastOptions={defaultToastOptions}
/>
```

You can also pass `ToastOptions` into each toast individually:

```jsx
const { success } = useToast();

success('It worked!', { autoHide: false });
```

### Container Options

| Option      | Description                                                    | Default         |
| ----------- | -------------------------------------------------------------- | --------------- |
| `target`    | A reference to an `Element` where toasts will be rendered into | `document.body` |
| `className` | A class name to attach to the container                        | _None_          |
| `style`     | An object of CSS properties to attach to the container         | _None_          |

### Toast Options

| Option             | Description                                                                                                                                   | Default      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `autoHide`         | Whether or not each toast should automatically disappear after `autoHideDuration` seconds                                                     | `true`       |
| `autoHideDuration` | How long (in seconds) until toasts disappear                                                                                                  | `5000`       |
| `position`         | Where should toast appear? One of: `top-left`, `top-center`, `top-right`                                                                      | `top-center` |
| `onClick`          | A handler to capture clicks on the toast. The handler receives an object as its only argument with a `dismiss` function to dismiss the toast. | _None_       |
| `className`        | A class name to attach to the toast                                                                                                           | _None_       |
| `style`            | An object of CSS properties to attach to the toast                                                                                            | _None_       |

## Recipes

#### Dismiss a toast on click

```js
const { success } = useToast():

success('Click me to dismiss', {
  onClick: ({ dismiss }) => dismiss()
});
```
