"use strict";  

// localStorage.setItem('number01', 5); // записать в localStorage
// localStorage.setItem('number02', 6);

// localStorage.removeItem('number');  // удалить конкретный ключ из localStorage
// localStorage.clear(); // очистить весь localStorage

// console.log(localStorage.getItem('number')); // получить ключ из localStorage

const   checkbox = document.querySelector('#checkbox'),
        form = document.querySelector('form'),
        change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) checkbox.checked = true;

if (localStorage.getItem('bg') === 'changed') form.style.backgroundColor = 'red';

checkbox.addEventListener('change', () => {
    localStorage.setItem('isChecked', true);
});

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed') {
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#ffffff';
    } else {
        localStorage.setItem('bg', 'changed');
        form.style.backgroundColor = 'red';
    }
});

const persone = {
    name: 'jeck',
    age: 25
};

const loginPersone = JSON.stringify(persone);
localStorage.setItem('alex', loginPersone);

console.log(JSON.parse(localStorage.getItem('alex')));