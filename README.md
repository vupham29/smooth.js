# Smooth.js

> Javascript library for creating the simple animation

## Getting started

### Download

👉 Self hosted -

### Initialize

#### Options

| Name                  | Required | Default  | Description                                 |
|-----------------------|----------|----------|---------------------------------------------|
| `id`                  | ❌        | unique   | Id for clarifying/getting instance.         |
| `timing`              | ❌        | linear   | Default timing function.                    |
| `duration`            | ❌        | 300      | Duration of the animation in millisecond.   |
| `onInit:(self) => {}` | ❌        | function | Callback after the library has initialized. |

```js
const instance = Smooth.init('.circle', {
    onInit: (self) => {}
});
```

### Methods

| Name     | Description               |
|----------|---------------------------|
| `smooth` | Animating the DOM Element |

#### Timing

Build in timing functions

| Name             | Description                     |
|------------------|---------------------------------|
| `linear`         |                                 |
| `ease`           |                                 |
| `easeInOutCubic` |                                 |
| `easeInOutExpo`  |                                 |
| `lerp`           | The crazy one, should try it!!! |

#### Events

| Name                      | Description |
|---------------------------|-------------|
| `onUpdate:(self) => {}`   |             |
| `onComplete:(self) => {}` |             |

#### Usage

With build in timing function

```js
instance.smooth({
    timing: 'ease',
    onUpdate: (self) => {
        self.target.style.transform = `translate3d(${data.progress + 'px'}, 0px, 0px)`;
    },
    onComplete: (self) => {
        self.target.classList.add('animated');
    }
});
```

With custom timing function. You can find more timing functions [here](https://gizma.com/easing/).

```js
instance.smooth({
    timing: (t) => Math.sin((t * Math.PI) / 2),
    onUpdate: (self) => {
        self.target.style.transform = `translate3d(${data.progress + 'px'}, 0px, 0px)`;
    }
})
```

## Deployment

Run `./public` in live server

```shell
npm run dev
```

Build files from `./src` to `./dist` for production

```shell
npm run prod
```

Build files from `./src` and `./dev` to `./dist` for deploying site

```shell
npm run build
```
