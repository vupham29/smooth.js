/**
 * https://easings.net/
 * */
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
        type: 'easeInOutCubic',
        func: easeInOutCubic
    },
    {
        type: 'easeInOutExpo',
        func: easeInOutExpo
    },
];


/**
 * Linear
 * */
function linear(timeFraction){
    return timeFraction;
}


/**
 * Ease
 * */
function ease(timeFraction){
    return Math.pow(timeFraction, 5);
}


/**
 * Ease In Out Cubic
 * */
function easeInOutCubic(timeFraction){
    return timeFraction < 0.5 ? 4 * Math.pow(timeFraction, 3) : 1 - Math.pow(-2 * timeFraction + 2, 3) / 2;
}


/**
 * Ease In Out Expo
 * */
function easeInOutExpo(timeFraction){
    return timeFraction === 0 ? 0 : timeFraction === 1 ? 1 : timeFraction < 0.5 ? Math.pow(2, 20 * timeFraction - 10) / 2 : (2 - Math.pow(2, -20 * timeFraction + 10)) / 2;
}