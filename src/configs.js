/**
 * Some references animation function
 * https://easings.net/
 * https://gizma.com/easing/
 * */
export const TIMING_FUNCTIONS = [
    {
        type: 'linear',
        func: linear
    },
];
export const DEFAULT_TIMING_FUNCTION = linear;


/**
 * Linear
 * @param {number} timeFraction
 * @return {number}
 * */
export function linear(timeFraction){
    return timeFraction;
}