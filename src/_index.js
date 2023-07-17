import {uid} from "./utils";
import {smooth} from "./smooth";
import {DEFAULT_TIMING_FUNCTION} from "./configs";

/**
 * Private class
 * */
class Smooth{
    constructor(){
        // smooth instance
        this.instances = [];
    }

    create(state){
        const instance = {
            id: uid('smooth-'),

            // simple animation
            timing: DEFAULT_TIMING_FUNCTION,
            duration: 300,

            // custom timing fraction (the value in [0, 1])
            // object value (for reference when the value changed)
            customTimeFraction: undefined,

            // destroy when completed
            destroyWhenCompleted: true,

            // callback
            onUpdate: self => {
            },
            ...state
        };

        // register the smooth animation
        smooth(instance);

        // register destroy method
        instance.destroy = this.destroy.bind(this, instance);

        // add to the instances
        this.instances.push(instance);

        return instance;
    }

    get(id){
        // matched condition
        const isMatched = (i) => i.id === id;
        return this.instances.find(isMatched);
    }

    destroy(instance){
        // matched condition
        const isMatched = (i) => i.id === instance.id;

        const result = this.instances.find(isMatched);
        if(result){
            const index = this.instances.findIndex(isMatched);

            // remove rAF
            cancelAnimationFrame(result.timeout);

            // remove from instances
            this.instances.splice(index, 1);
            return true;
        }
        return false;
    }
}


/**
 * Public library
 * */
window.Smooth = new Smooth();