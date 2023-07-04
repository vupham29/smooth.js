import {init, validateTarget} from "./helpers";
import {uid} from "./utils";
import {smooth} from "./smooth";
import {TIMING_FUNCTIONS} from "./configs";

/**
 * Private class
 * */
const defaultOptions = {
    id: uid('smooth-'),
    duration: 300, // transition duration
    timing: TIMING_FUNCTIONS[0].func, // linear
};

class Smooth{
    constructor(options = {}){
        this._class = {
            enabled: 'smoothjs-enabled',
        };

        // options
        this.options = {
            ...defaultOptions,
            ...options
        };

        // smooth instance
        this.instances = [];
    }

    smooth(state){
        if(!state){
            console.warn('Invalid object');
            return;
        }

        const instance = smooth(this, state);
        if (instance) this.instances.push(instance);

        return instance
    }
}


/**
 * Public library
 * */
window.Smooth = new Smooth()