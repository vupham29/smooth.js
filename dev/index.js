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

const mouse = {
    x: 0,
    y: 0
};

const currentPosition = {
    x: 0,
    y: 0
};

instance.target.parentElement.addEventListener('mousemove', (e) => {
    mouse.x = e.pageX - instance.target.parentElement.getBoundingClientRect().left - instance.target.getBoundingClientRect().width * 0.5;
    mouse.y = e.pageY - instance.target.parentElement.getBoundingClientRect().top - instance.target.getBoundingClientRect().height * 0.5;
});

instance.smooth({
    onUpdate: (self) => {
        currentPosition.x = self.lerp(currentPosition.x, mouse.x, 0.05);
        currentPosition.y = self.lerp(currentPosition.y, mouse.y, 0.05);

        console.log(currentPosition.x, currentPosition.y);

        instance.target.style.transform = `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`;
    },
    timing: 'lerp'
});