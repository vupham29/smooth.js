# Smooth.js

> Creating custom transition or complex animation with Javascript 🌊

## Getting started

### Download

👉 Self hosted -

### Initialize

#### Options

| Name       | Default | Description                               |
|------------|---------|-------------------------------------------|
| `id`       | unique  | Id for clarifying/getting instance.       |
| `timing`   | linear  | Default timing function.                  |
| `duration` | 300     | Duration of the animation in millisecond. |

### Instance

| Name      | Description                     |
|-----------|---------------------------------|
| `destroy` | destroy the transition instance |

#### Timing Functions

Built-in timing functions

| Name     | Description |
|----------|-------------|
| `linear` |             |

#### Events

| Name                    | Description |
|-------------------------|-------------|
| `onUpdate:(self) => {}` |             |

#### Usage

With custom timing function. You can find more timing functions [here](https://gizma.com/easing/).

```js
Smooth.create({
    id: 'smooth', // string
    timing: 'linear', // boolean (true), string, function
    duration: 300, // number

    destroyWhenCompleted: false, // boolean
    customTimeFraction: undefined, // object {value: timeFraction}

    onUpdate: (self) => {
    }
});
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
