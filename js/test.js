"use strict";  

window.addEventListener('DOMContentLoaded', () => {

    const log = function(a, b, ...rest) {
        console.log(a, b, rest);
    }

    log('basic', 'test', 'getter', 'setter', 'render');

    function calcORdouble(number, basis = 2) {
        console.log(number * basis);
    }
    calcORdouble(3,3);
    calcORdouble(3);

});