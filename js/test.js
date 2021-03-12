"use strict";  

window.addEventListener('DOMContentLoaded', () => {
    
    class Rectangle {
        constructor(height, width) {
            this.height = height;
            this.width = width;           
        }

        calcArea() {
            return this.height * this.width;
        }
    }

    class ColoredRectangleWithText extends Rectangle {
        constructor(height, width, text, bgColor) {
            super(height, width);
            this.text = text;
            this.bgColor = bgColor;
        }

        showMyProps() {
            console.log(`Текст: ${this.text}, Цвет: ${this.bgColor}`);
        }
    }

    const div = new ColoredRectangleWithText(25, 10, "Hi", 'red');
    div.showMyProps();
    console.log(div.calcArea());

    const   square = new Rectangle(10, 10);
    const   square01 = new Rectangle(12, 17);
    console.log(square.calcArea());
    console.log(square01.calcArea());

});