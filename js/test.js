"use strict";  

// new RegExp('pattern', 'flags');
// /pattern/f[i, g, m]

const ans = prompt('Введите ваше имя');
// const pass = prompt('password:');
const reg = /\d/g;

// console.log(ans.search(reg));
console.log(ans.match(reg));
// console.log(pass.replace(/./g, "*"));
// console.log('12-34-56'.replace(/-/g, ":"));

console.log(reg.test(ans));

// \d - digits = цифры  \D - не цифры
// \w = все буквы       \W - не буквы
// \s = пробелы         \S - не пробелы

const str = "My name is R2D2";

console.log(str.match(/\w\d\w\d/ig));