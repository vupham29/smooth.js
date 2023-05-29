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
Smooth.init('.square', {
    onInit: (self) => {
        console.log(self);
    }
})