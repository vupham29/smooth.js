import {TIMING_FUNCTIONS} from "./configs";
import {lerp} from "./lerp";
import {isFunction} from "./utils";

/**
 * Smooth transition
 * */
export function smooth(context, state){
    /**
     * lerp state
     * */
    if(state.timing === 'lerp'){
        lerp(state);
        return state;
    }

    // vars
    let currentTime = 0;
    const duration = state.duration ?? context.duration;

    const animate = (ts = 0) => {
        const delta = ts - currentTime;
        let timeFraction = 0, customTimeFraction = false;

        // get timeFraction from state
        if(typeof state.timeFraction === 'object' && typeof state.timeFraction.value === 'number'){
            timeFraction = state.timeFraction.value;
            customTimeFraction = true;
        }else{
            timeFraction = Math.min(delta / duration, 1);
        }

        // progress of the transition
        let progress = 0;

        // type string or function (custom transition)
        switch(typeof state.timing){
            case 'string':
                // timing in easeTypes
                const result = TIMING_FUNCTIONS.find(timingObj => timingObj.type === state.timing);

                if(!result){
                    console.error('Wrong type of timing function. Please check the docs again!');
                    console.warn('Using the default timing function (linear)');
                    progress = TIMING_FUNCTIONS[0].func(timeFraction);
                }else{
                    progress = result.func(timeFraction);
                }
                break;
            case 'function':
                progress = state.timing(timeFraction);
                break;
            default:
                progress = context.options.timing(timeFraction);
        }

        // validate end value of the progress, only in [0, 1]
        progress = Math.min(1, progress);

        // do callbacks
        if(state.onUpdate && isFunction(state.onUpdate)){
            state.onUpdate({
                ...context, progress, timeout: state.timeout,
            });
        }

        /**
         * End animation
         * */
        if(progress === 1 && !customTimeFraction){
            // remove raf
            cancelAnimationFrame(state.timeout);

            // onComplete
            if(state.onComplete && isFunction(state.onComplete)){
                state.onComplete(context);
            }
            return;
        }


        /**
         * Rerun per each frame
         * */
        state.timeout = requestAnimationFrame(animate);
    };
    animate();

    return state;
}