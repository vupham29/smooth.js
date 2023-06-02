// style
import './style.scss';

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

instance.smooth({
    onUpdate: (data) => {
        data.target.style.transform = `translate3d(${data.progress * 500 + 'px'}, ${data.progress * 200 + 'px'}, 0px)`;
    },
    duration: 1000,
});