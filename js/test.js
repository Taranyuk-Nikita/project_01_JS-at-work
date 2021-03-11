"use sctrict";  

window.addEventListener('DOMContentLoaded', () => {
    // конструктор
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
});