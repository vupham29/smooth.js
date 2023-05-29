// style
import './style.css';

// library
import '@/_index.js';

// package info
import packageInfo from '../package.json';

// update project information
const dataTitles = document.querySelectorAll('[data-title]');
const dataDescriptions = document.querySelectorAll('[data-description]');

// update information
dataTitles.forEach(e => e.innerHTML = packageInfo.name);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code
const instance = Smooth.init('.circle', {
    onInit: (self) => {
    }
});
console.log(instance);

instance.smooth({
    translateX: '50%',
    translateY: '50%'
});