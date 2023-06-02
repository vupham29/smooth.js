import {TIMING_FUNCTIONS} from "./configs";

/**
 * Smooth transition
 * */
export function smooth(context, state){
    let timeout = null, currentTime = 0;
    const duration = state.duration ?? context.duration;

    const animate = (ts = 0) => {
        const delta = ts - currentTime;
        const timeFraction = Math.min(delta / duration, 1);

        console.log('first progress', timeFraction);

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
        console.log('last progress', progress);

        state.onUpdate({
            ...context,
            progress
        });

        /**
         * End animation
         * */
        if(progress === 1){
            cancelAnimationFrame(timeout);
            return;
        }


        /**
         * Rerun per each frame
         * */
        timeout = requestAnimationFrame(animate);
    };
    animate();
}