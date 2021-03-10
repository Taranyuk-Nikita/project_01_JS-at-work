"use sctrict";  

window.addEventListener('DOMContentLoaded', () => {
    
    const   btn = document.querySelector('.btn');
    let     timerID_01,
            i = 0,
            id = setTimeout(function log() {
                console.log('I`m Batman!');
                id = setTimeout(log, 500);
            }, 500);

    btn.addEventListener('click', (event) => {
        timerID_01 = setInterval(logger02, 2000);
    });

    const   logger01 = () => {
                console.log('I`m  timerID4.')
            },
            logger02 = () => {
                if (i == 3) clearInterval(timerID_01);
                console.log('I`m BooBs.');
                i++;
            };

    const   timerID1 = setTimeout(function() {
                console.log('I`m  timerID1');
            }, 2000),
            timerID2 = setTimeout(function(text) {
                console.log(text);
            }, 4000 ,'I`m  timerID2'),
            timerID3 = setTimeout(function(text) {
                console.log(text);
            }, 5000 ,'I`m  timerID3'),
            timerID4 = setTimeout(logger01, 6000);
    
    clearInterval(timerID3);

});