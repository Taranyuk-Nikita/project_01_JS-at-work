"use strict";  

const   inputRUB = document.querySelector('#rub'),
        inputUSD = document.querySelector('#usd'); 

inputRUB.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    // request.open(method, url, async, login, password);
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // request.send(body);
    request.send();

    // status
    // statusText
    // response
    // readyState

    // request.addEventListener('readystatechange', () => {
    //     if (request.readyState === 4 && request.status === 200) {
    //         // console.log(request.response);
    //         const data = JSON.parse(request.response);
    //         inputUSD.value = (+inputRUB.value / data.current.usd).toFixed(2);
    //     } else {
    //         inputUSD.value = 'Что-то пошло не так...';
    //     }
    // });

    request.addEventListener('load', () => {
        if ( request.status === 200) {
            const data = JSON.parse(request.response);
            inputUSD.value = (+inputRUB.value / data.current.usd).toFixed(2);
        } else {
            inputUSD.value = 'Что-то пошло не так...';
        }
    });

});