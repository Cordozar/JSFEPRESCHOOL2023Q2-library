window.addEventListener('DOMContentLoaded', () => {
  // Navigation

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

    if (menu.classList.contains('profile-menu__active')) {
      menu.classList.remove('profile-menu__active');
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

  // Slider About

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
    dotsWithWrapper[slideIndex - 1].classList.add('slider__dot-wrapper_select');

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

  // Slider Favourites

  form = document.querySelector('.sorter__form');
  radios = document.querySelectorAll('.sorter__radio');
  seasons = document.querySelectorAll('.sorter__card-season');

  let indexSelectRadio;

  radios.forEach((el, i) => {
    if (el.checked === true) {
      seasons.forEach((el) => {
        el.classList.remove('sorter__card-season_select');
      });

      seasons[i].classList.add('sorter__card-season_select');

      indexSelectRadio = i;
    }
  });

  form.addEventListener('click', (e) => {
    if (e.target.closest('.sorter__radio')) {
      if (!checkRepearedPressingRadio()) {
        seasons[getIndexSelectSeason()].classList.remove('fade-in');
        seasons[getIndexSelectSeason()].classList.add('fade-out');

        setTimeout(() => {
          seasons[getIndexSelectSeason()].classList.remove(
            'sorter__card-season_select'
          );
          seasons[getIndexSelectRadio()].classList.remove('fade-out');
          seasons[getIndexSelectRadio()].classList.add(
            'fade-in',
            'sorter__card-season_select'
          );
        }, 500);
      }

      console.log('asdasdas');
    }
  });

  function checkRepearedPressingRadio() {
    let currSelectSeason;
    let currSelectRadio;

    seasons.forEach((el, i) => {
      if (el.classList.contains('sorter__card-season_select')) {
        currSelectSeason = i;

        radios.forEach((el, i) => {
          if (el.checked === true) {
            currSelectRadio = i;
          }
        });
      }
    });

    return currSelectRadio === currSelectSeason;
  }

  function getIndexSelectSeason() {
    let res;

    seasons.forEach((el, i) => {
      if (el.classList.contains('sorter__card-season_select')) {
        res = i;
      }
    });

    return res;
  }

  function getIndexSelectRadio() {
    let res;

    radios.forEach((el, i) => {
      if (el.checked === true) {
        res = i;
      }
    });

    return res;
  }

  // Authorization

  const iconProfile = document.querySelector('.header__icon-profile'),
    burgerStatus = document.querySelector('.burger img');

  var menu = document.querySelector('.profile-menu');

  iconProfile.addEventListener('click', () => {
    menu.classList.toggle('profile-menu__active');
    if (getComputedStyle(burgerStatus).opacity === '0') {
      burgerClose();
    }
  });

  // RegisterModal

  const register = document.querySelector('.profile-menu__register'),
    canvas = document.querySelector('.canvas'),
    registerModal = document.querySelector('.register'),
    loginModal = document.querySelector('.login'),
    body = document.body,
    registerSecond = document.querySelector('.cards__access-sign-up');

  function openRegisterModal() {
    canvas.classList.add('canvas__show');
    body.classList.add('body-no-scroll');
    registerModal.classList.add('register__show');
  }

  function closeRegisterModal() {
    canvas.classList.remove('canvas__show');
    body.classList.remove('body-no-scroll');
    registerModal.classList.remove('register__show');
  }

  register.addEventListener('click', () => {
    openRegisterModal();
  });

  canvas.addEventListener('click', (e) => {
    if (!e.target.closest('.register') && !e.target.closest('.login')) {
      closeRegisterModal();
      closeLoginModal();
    }
  });

  registerModal.addEventListener('click', (e) => {
    if (e.target.closest('.close-btn')) {
      closeRegisterModal();
    }
  });

  registerSecond.addEventListener('click', () => {
    openRegisterModal();
  });

  // LoginModal

  const login = document.querySelector('.profile-menu__login'),
    loginSecond = document.querySelector('.cards__access-log-in'),
    cardBtns = document.querySelectorAll('.card__btn');

  function openLoginModal() {
    canvas.classList.add('canvas__show');
    body.classList.add('body-no-scroll');
    loginModal.classList.add('login__show');
  }

  function closeLoginModal() {
    canvas.classList.remove('canvas__show');
    body.classList.remove('body-no-scroll');
    loginModal.classList.remove('login__show');
  }

  login.addEventListener('click', () => {
    openLoginModal();
  });

  cardBtns.forEach((el) => {
    el.addEventListener('click', () => {
      if (!localStorage.getItem('isAutorisation')) {
        openLoginModal();
      }
    });
  });

  loginModal.addEventListener('click', (e) => {
    if (e.target.closest('.close-btn')) {
      closeLoginModal();
    }
  });

  loginSecond.addEventListener('click', () => {
    openLoginModal();
  });

  // Save user data

  const registerForm = document.querySelector('.register__form'),
    inputRegisterFirstName = document.querySelector('#registerFirstName'),
    inputRegisterLastName = document.querySelector('#registerLastName'),
    inputRegisterEmail = document.querySelector('#registerEmail'),
    inputRegisterPassword = document.querySelector('#registerPassword');

  function generateRandomHexNineDigitNumber() {
    const min = 0x10000000; // Минимальное девятизначное число в 16-ричной системе
    const max = 0xfffffffff; // Максимальное девятизначное число в 16-ричной системе

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const hexNumber = randomNumber.toString(16).toUpperCase(); // Преобразуем в строку в 16-ричном формате

    return hexNumber;
  }

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
      inputRegisterFirstName &&
      inputRegisterLastName &&
      inputRegisterEmail &&
      inputRegisterPassword
    ) {
      localStorage.setItem('firstName', inputRegisterFirstName.value);
      localStorage.setItem('lastName', inputRegisterLastName.value);
      localStorage.setItem('email', inputRegisterEmail.value);
      localStorage.setItem('password', inputRegisterPassword.value);
      localStorage.setItem('cardNumber', generateRandomHexNineDigitNumber());
      localStorage.setItem('isRegister', true);
      localStorage.setItem('isAutorisation', true);
    }

    registerForm.reset();
    changesAfterRegistration();
  });

  const myProfileBtn = document.querySelector('.profile-menu__my-profile'),
    logOutBtn = document.querySelector('.profile-menu__logout');

  // Changes after rigistration

  const checkCard = document.querySelector('.search-card__search-btn'),
    cardInfo = document.querySelector('.search-card__info');

  changesAfterRegistration();

  function сhangeIconProfile() {
    if (localStorage.getItem('isAutorisation')) {
      iconProfile.classList.remove('header__icon-profile_without-registering');
      iconProfile.classList.add('header__icon-profile_registering');
      iconProfile.textContent = `${localStorage.getItem('firstName')[0]}${
        localStorage.getItem('lastName')[0]
      }`;
    } else {
      localStorage.removeItem('isAutorisation');

      iconProfile.classList.add('header__icon-profile_without-registering');
      iconProfile.classList.remove('header__icon-profile_registering');
      iconProfile.textContent = ``;
    }
  }

  function changeMenuProfile() {
    if (localStorage.getItem('isAutorisation')) {
      login.classList.remove('active');
      register.classList.remove('active');
      myProfileBtn.classList.add('active');
      logOutBtn.classList.add('active');
    } else {
      login.classList.remove('active');
      register.classList.remove('active');
      myProfileBtn.classList.add('active');
      logOutBtn.classList.add('active');
    }
  }

  function addStatusRegistration() {
    localStorage.setItem('isRegistration', true);
  }



  function changesAfterRegistration() {
    if (localStorage.getItem('isRegister')) {
      iconProfile.classList.remove('header__icon-profile_without-registering');
      iconProfile.classList.add('header__icon-profile_registering');
      iconProfile.textContent = `${localStorage.getItem('firstName')[0]}${
        localStorage.getItem('lastName')[0]
      }`;

      login.classList.remove('active');
      register.classList.remove('active');
      myProfileBtn.classList.add('active');
      logOutBtn.classList.add('active');
    }
  }

  const valueUserName = document.querySelector('.search-card__user-name'),
    valueCardNumber = document.querySelector('.search-card__card-number');

  checkCard.addEventListener('click', (e) => {
    e.preventDefault();

    if (localStorage.getItem('isRegister')) {
      const userName = `${localStorage.getItem(
        'firstName'
      )} ${localStorage.getItem('lastName')}`;
      const cardNumber = `${localStorage.getItem('cardNumber')}`;

      if (
        valueUserName.value === userName &&
        valueCardNumber.value === cardNumber
      ) {
        checkCard.style.display = 'none';
        cardInfo.style.display = 'flex';

        const req = new Promise(function (resolve) {
          setTimeout(function () {
            checkCard.style.display = 'block';
            cardInfo.style.display = 'none';

            resolve();
          }, 10000);
        });

        req.then(() => {
          valueUserName.value = '';
          valueCardNumber.value = '';
        });
      }
    }
  });

  logOutBtn.addEventListener('click', changesAfterLogout);

  function changesAfterLogout() {
    if (localStorage.getItem('isAutorisation')) {
      localStorage.removeItem('isAutorisation');

      iconProfile.classList.add('header__icon-profile_without-registering');
      iconProfile.classList.remove('header__icon-profile_registering');
      iconProfile.textContent = ``;

      login.classList.add('active');
      register.classList.add('active');
      myProfileBtn.classList.remove('active');
      logOutBtn.classList.remove('active');
    }
  }

  // Changes after rigistration

  // function changesAfterAutorisation () {
  //   if (localStorage.getItem('isAutorisation')) {}
  // }
});
