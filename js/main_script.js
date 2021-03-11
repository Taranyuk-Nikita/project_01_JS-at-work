"use sctrict";  

window.addEventListener('DOMContentLoaded', () => {

    const   box = document.querySelector('.box'),
            btn = document.querySelector('button');

    // const   width = box.clientWidth,
    //         height = box.clientHeight;
    // const   width = box.offsetWidth,
    //         height = box.offsetHeight;
    // const   width = box.scrollWidth,
    //         height = box.scrollHeight;
    const   width = box.scrollWidth,
            height = box.scrollHeight;

    console.log(`${width}, ${height}`);    

    btn.addEventListener('click', () => {
        // box.style.height = box.scrollHeight + 'px';
        console.log(box.scrollTop);
    });

    console.log(box.getBoundingClientRect().top);

    const style = window.getComputedStyle(box);
    console.log(style.display);

    console.log(document.documentElement.scrollTop);
    window.scrollTo(0, 400); // относительно начала странице (самый верхний левый угол)
    window.scrollBy(0, 400); // Относительно положения на странице

});