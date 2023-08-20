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

  // Slider About

  function slider() {
    const slides = document.querySelectorAll('.slider__slide'),
      slide = document.querySelector('.slider__slide'),
      dots = document.querySelectorAll('.slider__dot'),
      dotsWithWrapper = document.querySelectorAll('.slider__dot-wrapper'),
      prev = document.querySelector('.slide__left-arrow'),
      next = document.querySelector('.slide__right-arrow'),
      slidesField = document.querySelector('.slider__wrapper');

    let slideIndex = 1;
    let offset = 0;

    function checkWindowSize() {
      if (window.innerWidth <= 1439) {
        width = parseInt(window.getComputedStyle(slide).width);
      } else {
        width =
          parseInt(window.getComputedStyle(slide).width) +
          parseInt(window.getComputedStyle(slidesField).columnGap);

        if (slideIndex >= 4) {
          slideIndex = 3;

          offset = width * (slideIndex - 1);

          showSelectSlidePagination(slideIndex);

          moveSlides(offset);
        }
      }
    }

    window.addEventListener('load', checkWindowSize);
    window.addEventListener('resize', checkWindowSize);

    function showSelectSlidePagination(slideNumber) {
      dotsWithWrapper.forEach((dot) => {
        dot.classList.remove('slider__dot-wrapper_select');
      });
      dotsWithWrapper[slideIndex - 1].classList.add(
        'slider__dot-wrapper_select'
      );

      dots.forEach((dot) => {
        dot.classList.remove('slider__dot_select');
      });
      dots[slideNumber - 1].classList.add('slider__dot_select');
    }

    showSelectSlidePagination(1);

    function moveSlides(value) {
      slidesField.style.transform = `translateX(-${value}px)`;
    }

    function showSelectSlide() {
      dotsWithWrapper.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          slideIndex = i + 1;

          showSelectSlidePagination(slideIndex);

          offset = parseInt(width) * i;

          moveSlides(offset);
        });
      });
    }

    showSelectSlide();

    next.addEventListener('click', () => {
      if (offset === parseInt(width) * (slides.length - 1)) {
        offset = offset;
      } else {
        offset += parseInt(width);
      }

      moveSlides(offset);

      if (slideIndex >= slides.length) {
        slideIndex = 5;
      } else {
        slideIndex += 1;
      }

      showSelectSlidePagination(slideIndex);
    });

    prev.addEventListener('click', () => {
      if (offset === 0) {
        offset = 0;
      } else {
        offset -= parseInt(width);
      }

      moveSlides(offset);

      if (slideIndex <= 1) {
        slideIndex = 1;
      } else {
        slideIndex -= 1;
      }

      showSelectSlidePagination(slideIndex);
    });
  }

  slider();

  // Slider Favourites

  function sliderFavourites() {
    document.querySelector('.sorter__form').addEventListener('click', (e) => {
      if (e.target.classList.contains('sorter__radio')) {
        let clickRadio = e.target;

        removeSelectedRadio();
      }
    });

    function removeSelectedRadio() {
      let radios = document.querySelectorAll('.sorter__radio')
      console.log(radios);
    }
  }

  sliderFavourites();


});
