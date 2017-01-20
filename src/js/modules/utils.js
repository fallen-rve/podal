'use strict';

var extendClass = function(a, b) {
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    
    return a;
};

export default extendClass;
