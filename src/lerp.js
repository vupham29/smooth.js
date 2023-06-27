import {isFunction} from "./utils";

/**
 * Lerp
 * Linear Interpolation
 * */
export const lerp = (state) => {
    const timeout = state.timeout ?? null;

    const animate = () => {

        // update state
        if(state.onUpdate && isFunction(state.onUpdate)){
            state.onUpdate({
                lerp: lerpMap,
                timeout,
            });
        }

        state.timeout = requestAnimationFrame(animate);
    };
    animate();
};

/**
 * Lerp mapping value
 * */
const lerpMap = (start, end, amt) => (1 - amt) * start + amt * end;