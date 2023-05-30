import {linear} from "./linear";

/**
 * Smooth transition
 * */
export function smooth(context, from, to){

    // choose transition type
    switch(context.options.ease){
        case 'linear':
            linear(context, from, to, 6000);
            break;
        case 'ease-in':
            break;
        case 'ease-out':
            break;
        default:
    }
}