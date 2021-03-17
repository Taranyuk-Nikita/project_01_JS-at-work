"use strict";  

// Filter
const names = ['Nikita', 'Alex', 'Stepan', "Ilya", 'Nikolai', 'Elena', 'Ksenia', 'John', 'Dezdemona', 'Gerederuda'];

const shortNames = names.filter((name) => {
    return name.length < 5;
});

console.log(names);
console.log(shortNames);

// Map
const answers = ['TAranyuk', 'AnnA', 'Evgesh@'];

const result = answers.map(item => item.toLowerCase());

console.log(answers);
console.log(result);

// every/some
const someVar = [4, 'owo', '908123', 'rfwfwaeqfwqf'];
console.log(someVar.some(item => typeof(item) === 'number'));
console.log(someVar.every(item => typeof(item) === 'number'));

// Reduce
const numbers = [1, 5, 2, 13, 2, 12];

const res = numbers.reduce((sum, current) => {
    return sum + current; 
}, 5);

console.log(res);

const someObject = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
}

const newArray = Object.entries(someObject)
    .filter((item) => item[1] === 'persone')
    .map(item => item[0]);

console.log(newArray);