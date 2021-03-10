"use sctrict";  

window.addEventListener('DOMContentLoaded', () => {
    
    const   now = new Date();   // Ориентируется на локальную время и дату

    // Получение даты
    console.log(now);
    console.log(now.getFullYear()); // Год (4-х значный всегда)
    console.log(now.getMonth());    // Месяц
    console.log(now.getDate());     // Число
    console.log(now.getDay());      // День недели (начиная с воскресенья)
    console.log(now.getHours());    // Часы (в соответсвии с местным часовым поясом)
    console.log(now.getUTCHours()); // День недели (в соответсвии с 0-вым часовым поясом)

    console.log(now.getTimezoneOffset()); // Разница с 0-вым часовым поясом
    console.log(now.getTime());           // Кол-во миллисекунд с 0-вой даты (Date(0))

    // Установление даты - есть автоисправление
    console.log(now.setHours(18, 40)); // Установка часов (опционально минут)

    const   now02 = new Date('2021-04-10'); 
    // new Date.parse('2021-04-10');    // Равен строке 22

    let start = new Date();
    
    for (let i = 0; i < 10000000; i++) {
        let some = i ** 2;
    }

    let end = new Date();
    alert(`Цикл отработал за ${end - start} миллисекунд.`);
    

});