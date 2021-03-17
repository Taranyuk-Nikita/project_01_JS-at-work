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
            modalOpen = document.querySelectorAll('[data-modal]');

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
            modalTimerOpen = setTimeout(openModal, 240000);   

    modalOpen.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
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

    const getResosurce = async (url) => {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}.`);

        return await res.json();
    };

    getResosurce('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    /* ------------ POST FORM ----------*/
    
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        postForm(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    const messages = {
        loading: 'sources/svg/spinner.svg',
        success: 'Успешно!',
        fail: 'что-то пошло не так...'
    }

    function postForm(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `display: block; margin: 0 auto;`;
            form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksMaodal(messages.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksMaodal(`${messages.fail} - ${request.status}`);
            })
            .finally(() => {
                form.reset();
            });

        });
    }

    function showThanksMaodal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-modal-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 5000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}); 