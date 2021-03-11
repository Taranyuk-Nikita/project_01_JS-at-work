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
            modalTimerOpen = setTimeout(openModal, 60000);   

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

});