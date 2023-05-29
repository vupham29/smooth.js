import {linear} from "./linear";

/**
 * Smooth transition
 * */
export function smooth(context, object){
    const timeline = [];

    // check if object is array
    if(Array.isArray(object)){
        // do something with array
    }else{
        if(!object.duration){
            // get default duration
            object.duration = context.options.duration;
        }
        timeline.push(object);
    }

    // choose transition type
    switch(context.options.ease){
        case 'linear':
            linear(context.target, object, context.duration);
            break;
        case 'ease-in':
            break;
        case 'ease-out':
            break;
        default:
    }
}