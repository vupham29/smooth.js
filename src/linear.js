import {convertToPixelValue} from "./utils";

/**
 * Not pixel unit
 * */
const notPixelUnit = ['scale'];

export function linear(context, from, to, duration = 300){
    const target = context.target;

    // convert state
    convertToPixelValue(target, from);
    convertToPixelValue(target, to);

    const currentTime = 0;
    let timeout = 0;

    const lerp = (ts = 0) => {
        const delta = ts - currentTime;
        const progress = Math.min(delta / duration, 1);

        /**
         * Transform only
         * */
        const state = {transform: {}};

        /* loop to get end state */
        for(const [key, value] of Object.entries(to)){
            const fromValue = from[key] ?? 0;
            let progressValue = (parseFloat(value) - fromValue) * progress;

            // not px unit
            if(key !== 'scale'){
                progressValue += 'px';
            }

            switch(key){
                case 'translateX':
                    state.transform.x = progressValue;
                    break;
                case 'translateY':
                    state.transform.y = progressValue;
                    break;
                case 'translateZ':
                    state.transform.z = progressValue;
                    break;
                default:
                    state[key] = progressValue;
            }
        }

        // set style
        for(const [key, value] of Object.entries(state)){
            if(key === 'transform'){
                target.style.transform = `translate3d(${value.x}, ${value.y}, ${value.z ?? 0})`;
            }else{
                target.style[key] = value;
            }
        }

        /**
         * End animation
         * */
        if(progress === 1){
            cancelAnimationFrame(timeout);
            return;
        }

        timeout = requestAnimationFrame(lerp);
    };
    lerp();
}