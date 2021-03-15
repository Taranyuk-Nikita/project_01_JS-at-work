"use strict";  

window.addEventListener('DOMContentLoaded', () => {

    /* ------------- TABS -------------*/
    // Переменные
    const   tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');
    // Функции
    const   hideTabContent = () => {
                tabsContent.forEach(item => {
                    item.classList.add('hide');
                    item.classList.remove('show', 'fade');
                });
                tabs.forEach(item => {
                    item.classList.remove('tabheader__item_active');
                });
            },

            showTabContent = (i = 0) => {
                tabsContent[i].classList.add('show', 'fade');
                tabsContent[i].classList.remove('hide');
                tabs[i].classList.add('tabheader__item_active');
            };
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /* ------------- TIMER ------------*/
    const deadLine = '2021-05-20';

    const getTimeRemaining = (endTime) => {
        const   time = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((time / (1000 * 60)) % 60),
                seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    const setClock = (selector, endTime) => {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endTime);

            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.total <= 0) clearInterval(timeInterval);
        }
    }

    setClock('.timer', deadLine);

    /* ------------- MODAL ------------*/
    const   modal = document.querySelector('.modal'),
            modalOpen = document.querySelectorAll('[data-modal]'),
            modalClose = document.querySelector('[data-modal-close]');

    const   closeModal = () => {
                modal.classList.add('hide');
                modal.classList.remove('show');
                document.body.style.overflow = '';
            },   
            openModal = () => {
                modal.classList.add('show');
                modal.classList.remove('hide');
                // modal.classList.toggle('show'); // как вариант
                document.body.style.overflow = 'hidden';
                clearInterval(modalTimerOpen);
                window.removeEventListener('scroll', showModalByScroll);
            },
            showModalByScroll = () => {
                if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                    openModal();
                    window.removeEventListener('scroll', showModalByScroll);
                    clearInterval(modalTimerOpen);
                }
            },
            modalTimerOpen = setTimeout(openModal, 120000);   

    modalOpen.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
           closeModal();
        }
    });

    /* ------------- CARDS ------------*/
    class MenuCard {
        constructor(srcImg, alt, title, desrc, price, parentSelector, ...classes) {
            this.srcImg = srcImg;
            this.alt = alt;
            this.title = title;
            this.desrc = desrc;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToGrivna();
        }

        changeToGrivna() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
           
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element)
            } else {
                 this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.srcImg} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desrc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "sources/img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();
    new MenuCard(
        "sources/img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        "menu__item", 'big'
    ).render();
    new MenuCard(
        "sources/img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        "menu__item"
    ).render();

    /* ------------ POST FORM ----------*/
    
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        postForm(item);
    });

    const messages = {
        loading: 'Загрузка...',
        success: 'Успешно!',
        fail: 'что-то пошло не так...'
    }

    function postForm(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = messages.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json'); // XMLHttpRequest + FormData самостоятельно устанавливают заголовки
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            request.send(JSON.stringify(object));

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = messages.success;
                    form.reset();
                    setTimeout(() => statusMessage.remove(), 3000);
                } else { 
                    console.log(request.status);
                    statusMessage.textContent = messages.fail;
                }

            });

        });
    }

});