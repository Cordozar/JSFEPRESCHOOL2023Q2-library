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
      slide = document.querySelector('.slider__slide'),
      dots = document.querySelectorAll('.slider__dot'),
      dotsWithWrapper = document.querySelectorAll('.slider__dot-wrapper'),
      prev = document.querySelector('.slide__left-arrow'),
      next = document.querySelector('.slide__right-arrow'),
      slidesField = document.querySelector('.slider__wrapper');
    // width =
    //   parseInt(window.getComputedStyle(slide).width) +
    //   parseInt(window.getComputedStyle(slidesField).columnGap);

    let slideIndex = 1;
    let offset = 0;

    function checkWindowSize() {
      if (window.innerWidth <= 1399) {
        width = parseInt(window.getComputedStyle(slide).width);

        // if (slideIndex > 3) {
        //   slideIndex = 3;
        //   offset = parseInt(width) * slideIndex - 1;
        //   slidesField.style.transform = `translateX(-${offset}px)`;
        // }
        // console.log(slideIndex);
      } else {
        width =
          parseInt(window.getComputedStyle(slide).width) +
          parseInt(window.getComputedStyle(slidesField).columnGap);
      }
    }

    window.addEventListener('load', checkWindowSize);
    window.addEventListener('resize', checkWindowSize);

    function showSelectedSlidePagination() {
      dotsWithWrapper.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          slideIndex = i + 1;
          console.log(slideIndex);

          dots.forEach((dot) => {
            dot.classList.remove('slider__dot_select');
          });
          dots[i].classList.add('slider__dot_select');

          offset = parseInt(width) * i;
          slidesField.style.transform = `translateX(-${offset}px)`;
        });
      });
    }

    showSelectedSlidePagination();

    next.addEventListener('click', () => {
      if (offset === parseInt(width) * (slides.length - 1)) {
        offset = offset;
      } else {
        offset += parseInt(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex >= slides.length) {
        slideIndex = 5;
      } else {
        slideIndex += 1;
      }

      dots.forEach((dot) => {
        dot.classList.remove('slider__dot_select');
      });
      dots[slideIndex - 1].classList.add('slider__dot_select');

      console.log(slideIndex);
    });

    prev.addEventListener('click', () => {
      if (offset === 0) {
        offset = 0;
      } else {
        offset -= parseInt(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex <= 1) {
        slideIndex = 1;
      } else {
        slideIndex -= 1;
      }

      dots.forEach((dot) => {
        dot.classList.remove('slider__dot_select');
      });
      dots[slideIndex - 1].classList.add('slider__dot_select');

      console.log(slideIndex);
    });
  }

  slider();
});
