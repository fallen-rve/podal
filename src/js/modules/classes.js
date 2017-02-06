'use strict';
export const podalPrefix = 'podal-';

export const prefix = (items) => {
    const result = {};
    for (const i in items) {
        result[items[i]] = podalPrefix + items[i];
    }
    return result;
};

export const podalClasses = prefix([
    'wrapper',
    'close',
    'title',
    'body',
    'footer',
    'submit',
    'clear',
    'box',
    'alert',
    'loaded',
    'loading',
    'loader',
    'hide',
]);

export const iconTypes = prefix([
    'success',
    'failed'
]);
