/**
 * Debounce
 * @param func
 * @param timeout
 * @returns function
 */
export function debounce(func, timeout = 200){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


/**
 * Generate unique ID
 * @return string
 * @param prefix
 */
export function uid(prefix = ''){
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2);
}


/**
 * Remove accents in UNICODE
 * @param string
 * @return string
 * */
export function removeAccents(string){
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}


/**
 * Convert string to slug
 * @param string
 * @return string
 * */
export function stringToSlug(string){
    if(!string) return '';
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .toLowerCase();
}


/**
 * Create DOM Element
 * */
export function createDOMElement(options = {
    type: 'div',
    attributes: [{
        key: '',
        value: ''
    }],
    style: {},
    classes: []
}){
    let element = null;

    if(options.namespace){
        element = document.createElementNS(options.namespace, options.type);
    }else{
        element = document.createElement(options.type);
    }

    // assign data attribute
    if(options.attributes){
        options.attributes.forEach(attribute => element.setAttribute(attribute.key, attribute.value));
    }

    // assign classes
    if(options.classes){
        element.classList.add(...options.classes);
    }

    // assign custom style
    Object.assign(element.style, options.style);

    return element;
}


/**
 * Map number from another range to another range
 * @param number
 * @param inMin
 * @param inMax
 * @param outMin
 * @param outMax
 * @return number
 * */
export function mapNumber(number, inMin, inMax, outMin, outMax){
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


/**
 * Validate function
 * @param fn
 * @return boolean
 */
export function isFunction(fn){
    return (typeof fn === 'function');
}

/**
 * Get pixel value
 */
export function convertToPixelValue(target, state){
    for(const [key, value] of Object.entries(state)){
        // get the right value of %
        if(typeof value === 'number' || !value.includes('%')) return;

        // position value to the parent element
        const parentElm = target.offsetParent;
        const parentBox = parentElm.getBoundingClientRect();

        // translate
        if(key.includes('translate')){
            switch(key){
                case 'translateX':
                    state[key] = parseFloat(value) * 0.01 * target.getBoundingClientRect().width;
                    break;
                case 'translateY':
                    state[key] = parseFloat(value) * 0.01 * target.getBoundingClientRect().height;
                    break;
            }
        }
        else if(key.includes('top')){
            state[key] = parseFloat(value) * parentBox.height;
        }
        else if(key.includes('left')){
            state[key] = parseFloat(value) * parentBox.width;
        }
        else if(key.includes('right')){
            state[key] = parentBox.width - parseFloat(value) * parentBox.width;
        }
        else if(key.includes('bottom')){
            state[key] = parentBox.height - parseFloat(value) * parentBox.height;
        }
        else {
            // to the wrapper element
            state[key] = parseFloat(value) * target.parentElement.getBoundingClientRect()[key];
        }
    }
}