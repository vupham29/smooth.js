import {DEFAULT_TIMING_FUNCTION, TIMING_FUNCTIONS} from "./configs";
import {lerp} from "./lerp";
import {isFunction} from "./utils";

/**
 * Smooth transition
 * */
export function smooth(instance){
    // vars
    let currentTime = 0;
    const duration = instance.duration;

    // get timing function
    const timingFunction = getTimingFunction(instance);

    const animate = (ts = 0) => {
        // get deviation time value
        const delta = ts - currentTime;

        // get time fraction value
        const hasCustomTimeFraction = typeof instance.customTimeFraction === 'object' && typeof instance.customTimeFraction.value === 'number';
        let timeFraction = hasCustomTimeFraction ? instance.customTimeFraction.value : Math.min(delta / duration, 1);

        // validate end value of the progress, only in [0, 1] or undefined (for freedom animation)
        const progress = timingFunction === true ? undefined : Math.min(1, timingFunction(timeFraction));

        // do callbacks
        doCallbacks(instance, progress);

        // destroy the animation
        if(progress === 1 && instance.destroyWhenCompleted){
            instance.destroy();
            return;
        }

        // update the timeout value
        instance.timeout = requestAnimationFrame(animate);
    };
    animate();

    return instance;
}


/**
 * Get timing function
 * @param {object} instance
 * @return {function}
 * */
const getTimingFunction = (instance) => {
    // register rAF on this instance, not constraint by any value
    if(typeof instance.timing === 'boolean' && instance.timing) return true;

    // custom function
    if(typeof instance.timing === 'function') return instance.timing;

    // invalid type
    if(typeof instance.timing !== 'string'){
        console.warn('Invalid timing function, using the default timing function');
        return DEFAULT_TIMING_FUNCTION;
    }

    // timing in TIMING FUNCTIONS list
    const result = TIMING_FUNCTIONS.find(t => t.type === instance.timing);
    if(result) return result.func;

    console.warn('Wrong type of timing function. Please check the docs again!');
    console.warn('Using the default timing function (linear)');
    return DEFAULT_TIMING_FUNCTION;
};


/**
 * Do callbacks
 * @param {object} instance
 * @param {number|undefined} progress
 * @return void
 * */
const doCallbacks = (instance, progress) => {
    // do callbacks
    if(isFunction(instance.onUpdate)){
        instance.onUpdate({
            ...instance,
            progress,
            lerp: lerp
        });
    }
};