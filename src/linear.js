import {convertToPixelValue} from "./utils";

export function linear(target, state, duration = 300){
    // convert state
    convertToPixelValue(target, state);


    for(const [key, value] of Object.entries(state)) {

        // const currentState =

    }


    const currentTime = 0;
    let timeout = 0;

    const lerp = (ts = 0) => {
        const delta = ts - currentTime;

        const progress = Math.min(delta/duration, 1);
        console.log(progress);

        for(const [key, value] of Object.entries(state)) {
            target.style.transform = `${key}(${progress * value}px)`;
        }
        if (progress === 1) {
            cancelAnimationFrame(timeout)
            return;
        }

        timeout = requestAnimationFrame(lerp);
    };
    lerp()
}