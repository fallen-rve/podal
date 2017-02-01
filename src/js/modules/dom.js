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