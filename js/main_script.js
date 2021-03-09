"use sctrict";  

const   buttons = document.querySelectorAll('button'),
        wrapper = document.querySelector('.btn-block');

// console.log(buttons[0].classList.length); // Узнать кол-во классов у элемента
// console.log(buttons[0].classList.item(0)); // Получить наименование класса (по индексу)
// console.log(buttons[0].classList.add('red')); // Добавить класс у элемента
// console.log(buttons[0].classList.remove('blue', 'some')); // Удалить класс у элемента
// console.log(buttons[0].classList.toggle('blue')); // Переключить класс у элемента

// Проверка элемента на наличие класса
// if (buttons[1].classList.contains('red')) {
//     console.log('I have class "RED"!');
// }

// Добавляем класс через оброботчик событий

// Вариант №1
buttons[1].addEventListener('click', () => {
    if (!buttons[1].classList.contains('red')) {
        buttons[1].classList.add('red');
    } else {
        buttons[1].classList.remove('red');
    }
});

// Вариант №2
buttons[2].addEventListener('click', () => {
    buttons[2].classList.toggle('blue');
});

// -------------- Делегирование событий --------------
    // добавляется оброботчик событий не на сам элемент, а
    // на его родителя. Это позволяет динамически добавлять
    // элементы и буз лишней мароки задавать им ОС*.
    // *Обработчик событий 

wrapper.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('blue')) {
        console.log("Hi, and I`m blue Button.");
    } else if (event.target && event.target.matches('button.red')) {
        console.log("А я крассный, и я говорю по русски.");
    } else if (event.target && event.target.tagName == 'BUTTON') {
        console.log("Hi, it`s me, Button.");
    }
});