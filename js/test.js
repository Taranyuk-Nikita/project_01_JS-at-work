"use strict";  

window.addEventListener('DOMContentLoaded', () => {

    const persone = {
        name: 'Nikita',
        telephone : '+7 999 999 99 99',
        parants: {
            mama: 'Lena',
            dady: 'Igor'
        }
    };
    console.log(JSON.parse(JSON.stringify(persone)));
    const clone = (JSON.parse(JSON.stringify(persone)));
    clone.parants.mama = "Elena";
    console.log(clone);

});

