"use strict";  // В предидущих конспектах ошибка!!!

window.addEventListener('DOMContentLoaded', () => {
    
    // 1) Обычная функция: this = window, однако вместе с "use strict" this = undefined
    function showThis(a, b) {
        console.log(this);
        function sum () {
            console.log(this);
            return a + b; 
        }
        console.log(sum());
    }
    showThis(1, 1);
    console.log('----------------------------------------------------------------');

    // 2) Контекст у методов объекта - сам объект
    const   obj = {
        a: 20,
        b: 15,
        sum: function() {
            console.log(this);
        }
    };
    obj.sum();
    console.log('----------------------------------------------------------------');

    // 3) This в конструкторах и классах это новый экземпляр объекта
    function User(name, id) {
        this.name = name;
        this.id = id;
        this.human = true;
        this.hello = () => {
            console.log(`Hello ${this.name}.`)
        };
    }
    User.prototype.exit = function() {
        console.log(`User ${this.name}[${this.id}] has left.`);
    } 
    const Nikita = new User('Nikita', 21);
    Nikita.hello();
    Nikita.exit();
    console.log('----------------------------------------------------------------');

    // 4) Ручная привязка: call, apply, bind
    function sayName(surname) {
        console.log(this);
        console.log(`${this.name} ${surname}`);
    }
    const user01 = {
        name: 'Nikita'
    };
    sayName.call(user01, 'Taranyuk');
    sayName.apply(user01, ['Taranyuk']);
    function counter(num){
        return this * num;
    }
    const double = counter.bind(2);
    console.log(double(3));
    console.log(double(10));
    console.log('----------------------------------------------------------------');


    const btn = document.querySelector('[data-someBTN]');
    // * event.target = this
    btn.addEventListener('click', function(){
        console.log(this);
    });
    // ** При стрелочных функций теряется контекст вызова, и по этому нужно внимательно следить за this
    const newSomeObj = {
        num: 5,
        sayNumber: function() {
            const say = () => {
                console.log(this);
            };
            say();
        }
    };
    newSomeObj.sayNumber();
    // *** Сокращённая запись стрелочной функции
    const calcDouble = a => a * 2;
    console.log(calcDouble(2));

});