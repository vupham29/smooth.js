export const TIMING_FUNCTIONS = [
    {
        type: 'linear',
        func: linear
    },
    {
        type: 'ease',
        func: ease
    },
    {
        type: 'lerp',
        func: linear()
    },
];


/**
 * Linear
 * */
function linear (timeFraction){return timeFraction}


/**
 * Ease
 * */
function ease (timeFraction){return Math.pow(timeFraction, 5)}