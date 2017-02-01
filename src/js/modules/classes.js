'use strict';
export const swalPrefix = 'podal-';

export const prefix = (items) => {
  const result = {};
  for (const i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

export const swalClasses = prefix([
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
  'loader'
]);

export const iconTypes = prefix([
  'success',
  'failed'
]);
