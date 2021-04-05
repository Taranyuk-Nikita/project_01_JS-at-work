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

    /* ------------ SLIDER ----------*/

    const   slides = document.querySelectorAll('.offer__slide'),
            slider = document.querySelector('.offer__slider'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            slidesField = document.querySelector('.offer__slider-inner'),
            widthField = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    // Вариант 1

    // const showSlides = (n) => {
    //     if (n > slides.length) slideIndex = 1;
    //     if (n < 1) slideIndex = slides.length;

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     };
    // };

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // };

    // const nextSlide = (n) => {
    //     showSlides(slideIndex += n);
    // }; 

    // prev.addEventListener('click', () => {
    //     nextSlide(-1);
    // });
    // next.addEventListener('click', () => {
    //     nextSlide(1);
    // });

    // Вариант 2
        
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `${slideIndex}`;
    };

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = widthField;
    });

    slider.style.position = 'relative';

    const   indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) dot.style.opacity = 1;
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(widthField) * (slides.length - 1)) { 
            offset = 0;
        } else {
            offset += deleteNotDigits(widthField);
        };

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { 
            offset = deleteNotDigits(widthField) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(widthField);
        };

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(widthField) * (slideTo - 1);
            
            slidesField.style.transform = `translateX(-${offset}px)`;
        
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = `${slideIndex}`;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    })

     /* ------------ CALC CCAL ----------*/

    const  result = document.querySelector('.calculating__result span');
     
    let    sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettinings(selector, activeSelector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeSelector);
            if (element.getAttribute('data-sex') === localStorage.getItem('sex')) {
                element.classList.add(activeSelector);
            }

            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeSelector);
            }
        });
    }

    initLocalSettinings('#gender div', 'calculating__choose-item_active');
    initLocalSettinings('.calculating__choose_big div', 'calculating__choose-item_active');

    const calcTotal = () => {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };


    const getStaticInfo = (selector, activeSelector) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else if (event.target.getAttribute('data-sex')) {
                    sex = event.target.getAttribute('data-sex');
                    localStorage.setItem('sex', event.target.getAttribute('data-sex'));
                }

                elements.forEach(item => {
                    item.classList.remove(activeSelector);
                });

                event.target.classList.add(activeSelector);
            
                calcTotal();
            });
        });
    };

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    const getDinamicInfo = (selector) => {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                default:
                    console.log('Value ERROR!');
                    break;
            }
            
        calcTotal();
        });
    };

    getDinamicInfo('#height');
    getDinamicInfo('#weight');
    getDinamicInfo('#age');

    calcTotal();

}); 