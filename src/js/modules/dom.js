'use strict';

export const isVisible = (elem) => elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;

export const getPodal = () => document.body.querySelector('.podal-wrapper');

export const removeClass = (elem, className) => {
    if (!elem || !className) {
        return;
    }
    const classes = className.split(/\s+/).filter(Boolean);
    classes.forEach((className) => {
          elem.classList.remove(className);
    });
};

export const addClass = (elem, className) => {
    if (!elem || !className) {
        return;
    }
    const classes = className.split(/\s+/).filter(Boolean);
    classes.forEach((className) => {
        elem.classList.add(className);
    });
};

export const hasClass = (elem, className) => {
    if (elem.classList) {
        return elem.classList.contains(className)
    }
    return false;
};

export const fadeIn = (elem, fn =()=>{}, speed) => {
    elem.style.opacity = 0;

    let last = +new Date();
    const tick = function () {
        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+elem.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
            fn();
        }
    };
    tick();
};

export const fadeOut = (elem, fn=()=>{}, speed) => {
    elem.style.opacity = 0;

    let last= +new Date();
    const tick = function () {
        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+elem.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
            fn();
        }
    };
    tick();
};

export const delay = (fn=()=>{}, delay) => {
    setTimeout(fn, delay);
};