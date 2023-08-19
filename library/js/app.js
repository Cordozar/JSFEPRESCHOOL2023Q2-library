window.addEventListener('DOMContentLoaded', () => {
  // Navigation

  function navigation() {
    const burger = document.querySelector('.burger'),
      navigation = document.querySelector('.nav'),
      navigationHidden = document.querySelector('.burger_open'),
      navigationShow = document.querySelector('.burger_close'),
      navLinks = document.querySelectorAll('.nav__item');

    function burgerClose() {
      navigation.classList.remove('nav_active');
      navigationHidden.classList.remove('burger_disablet-img');
      navigationShow.classList.add('burger_disablet-img');
    }

    function burgerOpen() {
      navigation.classList.add('nav_active');
      navigationHidden.classList.add('burger_disablet-img');
      navigationShow.classList.remove('burger_disablet-img');
    }

    function clickerBurger() {
      navLinks.forEach((el) => {
        el.addEventListener('click', burgerClose);
      });

      if (navigation.classList.contains('nav_active')) {
        burgerClose();
      } else {
        burgerOpen();
      }

      document.addEventListener('click', (e) => {
        if (
          !navigation.contains(e.target) &&
          !e.target.closest('.burger') &&
          !e.target.closest('.header__icon-profile')
        ) {
          burgerClose();
        }
      });
    }

    burger.addEventListener('click', clickerBurger);
  }

  navigation();

  // Slider

  function slider() {
    const slides = document.querySelectorAll('.slider__slide'),
      dots = document.querySelectorAll('.slider__dot-wrapper'),
      prev = document.querySelector('.slide__left-arrow'),
      next = document.querySelector('.slide__right-arrow'),
      slidesContent = document.querySelector('.slider__content'),
      slidesField = document.querySelector('.slider__wrapper'),
      width = window.getComputedStyle(slidesContent).width;

    let slideIndex = 1;
    let offset = 0;

    next.addEventListener('click', () => {
      if (offset === parseInt(width) * (slides.length - 1)) {
        offset = offset;
      } else {
        offset += parseInt(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', () => {
      if (offset === 0) {
        offset = 0;
      } else {
        offset -= parseInt(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
    });
  }

  slider();
});
