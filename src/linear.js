import {convertToPixelValue} from "./utils";

export function linear(target, state, duration = 300){
    // convert state
    convertToPixelValue(target, state);


    for(const [key, value] of Object.entries(state)) {

        // const currentState =

    }


    const currentTime = 0;
    const lerp = (ts = 0) => {
        const delta = ts - currentTime;
        console.log(delta);
        requestAnimationFrame(lerp);


    };
    lerp()
}