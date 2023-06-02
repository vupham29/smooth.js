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
        return;
    }

    let timeout = null, currentTime = 0;
    const duration = state.duration ?? context.duration;

    const animate = (ts = 0) => {
        const delta = ts - currentTime;
        const timeFraction = Math.min(delta / duration, 1);

        /**
         * Check timing function
         * */
        let progress = 0;

        switch(typeof state.timing){
            case 'string':
                // timing in easeTypes
                const result = TIMING_FUNCTIONS.find(timingObj => timingObj.type === state.timing);

                if(!result){
                    console.error('Wrong type of timing function. Please check again!!!');
                    return;
                }

                // get the progress
                progress = result.func(timeFraction);
                break;
            case 'function':
                progress = state.timing(timeFraction);
                break;
            default:
                progress = context.options.timing(timeFraction);
        }

        // add bound for progress
        progress = Math.min(1, progress);

        // update state
        if(state.onUpdate && isFunction(state.onUpdate)){
            state.onUpdate({
                ...context,
                progress,
                timeout,
            });
        }

        /**
         * End animation
         * */
        if(progress === 1){
            // remove raf
            cancelAnimationFrame(timeout);

            // onComplete
            if(state.onComplete && isFunction(state.onComplete)){
                state.onComplete(context);
            }

            return;
        }


        /**
         * Rerun per each frame
         * */
        timeout = requestAnimationFrame(animate);
    };
    animate();
}