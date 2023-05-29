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
        timeline.push(object);
    }

    // choose transition type
    switch(context.options.ease){
        case 'linear':
            linear(context.target, object, 6000);
            break;
        case 'ease-in':
            break;
        case 'ease-out':
            break;
        default:
    }
}