"use sctrict";  

window.addEventListener('DOMContentLoaded', () => {

    const   btn = document.querySelector('.btn');
    let     timerID,
            i = 0;

    const myAnimation = () => {
        const   element = document.querySelector('.box');
        let     pos = 0;

        const frame = () => {
            if (pos == 300) {
                clearInterval(id)
            } else{
                pos++;
                element.style.left = `${pos}px`;
                element.style.top = `${pos}px`;
            } 
        }

        const id = setInterval(frame, 5);
    };

    btn.addEventListener('click', myAnimation);

});