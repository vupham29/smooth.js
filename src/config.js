import {linear} from "./linear";

export const TIMING_FUNCTIONS = [
    {
        type: 'linear',
        func: timeFraction => timeFraction
    },
    {
        type: 'ease',
        func: (timeFraction) => Math.pow(timeFraction, 5)
    },
    {
        type: 'ease-in',
        func: linear()
    },
    {
        type: 'ease-out',
        func: linear()
    },
    {
        type: 'lerp',
        func: linear()
    },
];