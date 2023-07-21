// style
import './style.scss';

// library
import '@/_index.js';
import './ScrollTrigger.min';
import './Position.min';

// package info
import packageInfo from '../package.json';

// update project information
const dataTitles = document.querySelectorAll('[data-title]');
const dataDescriptions = document.querySelectorAll('[data-description]');

// update information
dataTitles.forEach(e => e.innerHTML = packageInfo.prettyName);
dataDescriptions.forEach(e => e.innerHTML = packageInfo.description);

// create smooth scrolling on the entire page
const scInnerElement = document.querySelector('[data-sc-inner]');
let currentPosition = 0;

Smooth.create({
    timing: true,
    onUpdate: (self) => {
        // update height of the body
        document.body.style.height = scInnerElement.clientHeight + 'px';

        // update the position with the scroll offset
        currentPosition = self.lerp(currentPosition, scrollY, 0.04);
        scInnerElement.style.transform = `translate3d(0, ${currentPosition * -1}px, 0)`;
    }
});

// Parallax Image
let progressInViewport = {value: 0};
let currentProgress = 0;
const trigger = document.querySelector('[data-parallax]');

ScrollTrigger.create({
    trigger: trigger,
    start: 'top 90%',
    end: 'top 20%',
    onUpdate: (self) => {
        progressInViewport.value = self.progress;
    }
});
Smooth.create({
    customTimeFraction: progressInViewport,
    destroyWhenCompleted: false,
    onUpdate: (self) => {
        currentProgress = self.lerp(currentProgress, self.progress, 0.03).toFixed(3);
        trigger.style.setProperty('--progress', currentProgress);
    }
});

// custom cursor
const cursor = document.querySelector('[data-cursor]');
let xPosition = 0, yPosition = 0, currentX = 0, currentY = 0;

Position.create({
    target: '[data-custom-cursor]',
    onMouseEnter: () => {
        document.body.classList.add('has-custom-cursor');
    },
    onMouseMove: (self) => {
        xPosition = self.documentPosition.x;
        yPosition = self.documentPosition.y;

        const button = self.event.target.closest('button');
        if(!button){
            document.body.classList.remove('hover-button');
            return;
        }
        cursor.style.setProperty('--buttonWidth', button.getBoundingClientRect().width + 'px');
        cursor.style.setProperty('--buttonHeight', button.getBoundingClientRect().height + 'px');
        cursor.style.setProperty('--buttonY', button.getBoundingClientRect().top + scrollY + 'px');
        cursor.style.setProperty('--buttonX', button.getBoundingClientRect().left + 'px');
        document.body.classList.add('hover-button');

    },
    onMouseLeave: () => {
        document.body.classList.remove('has-custom-cursor');
    }
});
Smooth.create({
    timing: true,
    onUpdate: (self) => {
        currentX = self.lerp(currentX, xPosition, 0.05);
        currentY = self.lerp(currentY, yPosition, 0.05);
        cursor.style.setProperty('--x', currentX + 'px');
        cursor.style.setProperty('--y', currentY + 'px');
    }
});