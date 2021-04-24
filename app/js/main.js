
$(function(){
    $('.portfolio-slider').slick({
        arrows: true,
        dots: true, 
        appendArrows: $('.portfolio__navigation-arrows'),
        appendDots: $('.portfolio__navigation-dots'),
    });

    $('.photo-slider__big').slick({
        asNavFor: '.photo-slider__thumb',
        draggable: false,
        fade: true,
        arrows: false,
      });
      $('.photo-slider__thumb').slick({
        asNavFor: '.photo-slider__big',
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        draggable: false,
      });
      $('.reviews-slider').slick({
        dots: true,
        appendArrows: $('.reviews__navigation'),
        appendDots: $('.reviews__navigation'),
      });
});


/* Header visibility */
let windowPosition;
const header = document.querySelector('.header-top');
const menu = document.querySelector('.header-menu');
const navigationList = document.querySelector('.navigation__list');

window.addEventListener('scroll', () => {
    if(windowPosition < this.pageYOffset) {
        header.classList.add('hide');
    } else if(windowPosition > this.pageYOffset) {
        header.classList.remove('hide');
    }
    if(this.pageYOffset > 164) {
        header.classList.add('active');
        menu.classList.add('active');
    } else {
        header.classList.remove('active');
        menu.classList.remove('active');
    }
    windowPosition = this.pageYOffset;
});

/* Menu functionality */
const menuIcon = document.querySelector('.navigation__icon');
const menuList = document.querySelector('.navigation__list');
const body = document.querySelector('body');


menuIcon.addEventListener('click', displayMenu);
window.addEventListener('click', (e) => {inMenu(e)});

function displayMenu() {
    menuIcon.classList.toggle('active');
    menuList.classList.toggle('active');
    body.classList.toggle('lock');
};

function inMenu(e) {
    const target = e.target;
    const isMenu = target == menuList || menuList.contains(target);
    const isMenuActive = menuList.classList.contains('active');
    const isMenuIcon = target == menuIcon;


    if(!isMenu && !isMenuIcon && isMenuActive) {
        displayMenu();
    }
};


/* Resizeble textare */
const chatTextarea = document.querySelector('.contact__textarea');
const chatTextareaComputed = getComputedStyle(chatTextarea);
const chatDefaultTextareaHeight = chatTextareaComputed.height;

chatTextarea.addEventListener('keyup', () => {
    if(chatTextarea.scrollTop > 0) {
        chatTextarea.style.height = chatTextarea.scrollHeight + 'px'; 
    } else if(chatTextarea.scrollHeight > parseInt(chatTextareaComputed.maxHeight)) {
        chatTextarea.style.overflowY = 'scroll';
    } else if(chatTextarea.value == "") {
        chatTextarea.style.height = chatDefaultTextareaHeight;
    }
});


/* Scroll to section */
const navLinks = document.querySelectorAll('a.nav-link');
const menuLinks = document.querySelectorAll('a.navigation__link');

    navLinks.forEach(link => {
        link.addEventListener('click', onLinkClick);
    });

    function onLinkClick(e) {
        e.preventDefault();
        const link = e.target;

        if(link.classList.contains('navigation__link')) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
            });
            link.classList.add('active');
        };

        if(link.hasAttribute('href') && document.querySelector(link.getAttribute('href'))) {
            const goto = document.querySelector(link.getAttribute('href'));
            const coordinates = goto.getBoundingClientRect().top + pageYOffset;

            window.scrollTo({
                top: coordinates,
                behavior: 'smooth'
            });
        };

        if(window.innerWidth <= '767') {
            displayMenu();
        } 
    };