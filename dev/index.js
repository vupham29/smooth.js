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
dataTitles.forEach(e => e.innerHTML = packageInfo.prettyName);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// code
const circle = document.querySelector('.circle');
let last = 0;

Smooth.create({
    timing: 'linear',
    destroyWhenCompleted: false,
    onUpdate: (self) => {
        last = self.lerp(last, self.progress, 0.03);
        circle.style.transform = `translate3d(${500 * last}px,0,0)`;
    }
});