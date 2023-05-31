import {init, validateTarget} from "./helpers";
import {uid} from "./utils";
import {smooth} from "./smooth";

/**
 * Private class
 * */
const defaultOptions = {
    id: uid('smooth-'),
    duration: 300,
    timing: 'linear',
    onInit: (self) => {
    },
};

class Smooth{
    constructor(target, options){
        this._attr = {};
        this._class = {
            enabled: 'smoothjs-enabled',
        };

        // validate target
        this.target = validateTarget(target);
        if(!target) return;

        // options
        this.options = {
            ...defaultOptions,
            ...options
        };

        // ease types
        this.easeTypes = easeTypes;

        // init options
        init(this);
    }

    smooth(state){
        if(!state){
            console.warn('Invalid object');
            return;
        }

        smooth(this, state);
    }
}


/**
 * Controller
 * */
class SmoothController{
    constructor(){
        this.instances = [];
    }

    add(instance = {}){
        if(!this.instances.length || this.instances.find(i => i.id !== instance.id)){
            this.instances.push(instance);
            return instance;
        }
        console.error('The ID of instance has been existed. Please check again!');
        return null;
    }

    get(id){
        return this.instances.find(i => i.id === id);
    }
}


/**
 * Public library controller
 * */
window.SmoothController = new SmoothController();


/**
 * Public library
 * */
window.Smooth = {
    init: (target, options = {}) => {
        return window.SmoothController.add(new Smooth(target, options));
    },
    get: (id) => window.SmoothController.get(id)
};