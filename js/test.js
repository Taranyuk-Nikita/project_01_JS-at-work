"use strict";  

console.log('запрос данных...');

const request = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Подготовка данных...');

        const product = {
            name: 'TV',
            price: 30000
        };

        resolve(product);

    }, 2000);
});

request.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product);
            // reject();
        }, 2000);
    });
}).then(data => {
    data.modify = true;
    return data;
}).then((data) => {
    console.log(data);
}).catch(() => {
    console.error('Произошла ошибка!!!');
}).finally(() => {
    console.log(`Данные успешно получены!`);
});

// All и Race
const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    })
};

test(1000).then(() => console.log(`1000 ms`));
test(2000).then(() => console.log(`2000 ms`));

// Пока все не загрузятся
Promise.all([test(1000), test(2000)]).then(() => {
    console.log('all');
});

// Кто быстрее
Promise.race([test(5000), test(3000)]).then(() => {
    console.log('RACE!!!');
});