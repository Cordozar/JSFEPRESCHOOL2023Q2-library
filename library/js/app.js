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
        !e.target.closest('.header__icon-profile')&&
        !e.target.closest('.profile-menu')
      ) {
        burgerClose();
        menu.classList.remove('profile-menu__active')
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

  var iconProfile = document.querySelector('.header__icon-profile'),
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
    registerSecond = document.querySelector('.cards__access-sign-up'),
    registerThird = document.querySelector('.login__link');

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
    menu.classList.remove('profile-menu__active');
  });

  canvas.addEventListener('click', (e) => {
    if (!e.target.closest('.register') && !e.target.closest('.login')) {
      closeRegisterModal();
      closeLoginModal();
      closeProfileModal();
      closeBuyModal();
    }
  });

  function closeModalBtn(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('.close-btn')) {
        closeRegisterModal();
        closeLoginModal();
        closeProfileModal();
        closeBuyModal();
      }
    });
  }

  closeModalBtn(registerModal);

  registerSecond.addEventListener('click', () => {
    openRegisterModal();
  });

  registerThird.addEventListener('click', () => {
    closeLoginModal();
    openRegisterModal();
  });

  // LoginModal and BuyModal

  const login = document.querySelector('.profile-menu__login'),
    loginSecond = document.querySelector('.cards__access-log-in'),
    cardBtns = document.querySelectorAll('.card__btn'),
    buyModal = document.querySelector('.buy-modal'),
    loginThird = document.querySelector('.register_link');

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

  function openBuyModal() {
    canvas.classList.add('canvas__show');
    body.classList.add('body-no-scroll');
    buyModal.classList.add('buy-modal_active');
  }

  function closeBuyModal() {
    canvas.classList.remove('canvas__show');
    body.classList.remove('body-no-scroll');
    buyModal.classList.remove('buy-modal_active');
  }

  login.addEventListener('click', () => {
    openLoginModal();
    menu.classList.remove('profile-menu__active');
  });

  closeModalBtn(loginModal);
  closeModalBtn(buyModal);

  loginSecond.addEventListener('click', () => {
    openLoginModal();
  });

  loginThird.addEventListener('click', () => {
    closeRegisterModal();
    openLoginModal();
  });
  // // Работа с модальным окном для покупки книг

  // let bookNumber = 0;

  cardBtns.forEach((el, i) => {
    el.addEventListener('click', () => {
      bookNumber = i;

      if (!checkAutorisationStatus()) {
        openLoginModal();
      } else {
        openBuyModal();
      }
    });
  });

  // Changes after rigistration and autorisation

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

  // Filling out data in localstage

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
      localStorage.setItem('countAutorisation', 1);

      changesAfterAutorisation();

      closeRegisterModal();
    }

    registerForm.reset();
  });

  const loginForm = document.querySelector('.login__form'),
    inputLoginEmail = document.querySelector('.login__email-input'),
    inputLoginPassword = document.querySelector('.login__password-input');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
      (inputLoginEmail.value === localStorage.getItem('email') ||
        inputLoginEmail.value === localStorage.getItem('cardNumber')) &&
      inputLoginPassword.value === localStorage.getItem('password')
    ) {
      localStorage.setItem('isAutorisation', true);

      changesAfterAutorisation();
      counterAutorisation();

      closeLoginModal();
    }
  });

  const myProfileBtn = document.querySelector('.profile-menu__my-profile'),
    logOutBtn = document.querySelector('.profile-menu__logout'),
    checkCard = document.querySelector('.search-card__search-btn'),
    cardInfo = document.querySelector('.search-card__info');

  function changesAfterAutorisation() {
    changeIconProfile();
    toogleAttributeTitle();
    toggleTitleMenu();
    changeMenuProfile();
    changeDigitalCards();
  }

  changesAfterAutorisation();

  function checkAutorisationStatus() {
    if (localStorage.getItem('isAutorisation')) {
      return true;
    } else {
      return false;
    }
  }

  function changeIconProfile() {
    if (checkAutorisationStatus()) {
      iconProfile.classList.remove('header__icon-profile_without-registering');
      iconProfile.classList.add('header__icon-profile_registering');
      iconProfile.textContent = `${localStorage.getItem('firstName')[0]}${
        localStorage.getItem('lastName')[0]
      }`;
    } else {
      iconProfile.classList.add('header__icon-profile_without-registering');
      iconProfile.classList.remove('header__icon-profile_registering');
      iconProfile.textContent = ``;
    }
  }

  changeIconProfile();

  function changeMenuProfile() {
    if (checkAutorisationStatus()) {
      login.classList.remove('active');
      register.classList.remove('active');
      myProfileBtn.classList.add('active');
      logOutBtn.classList.add('active');
    } else {
      login.classList.add('active');
      register.classList.add('active');
      myProfileBtn.classList.remove('active');
      logOutBtn.classList.remove('active');
    }
  }

  function toogleAttributeTitle() {
    if (checkAutorisationStatus()) {
      const userName = `${localStorage.getItem(
        'firstName'
      )} ${localStorage.getItem('lastName')}`;
      iconProfile.setAttribute('title', userName);
    } else {
      iconProfile.removeAttribute('title');
    }
  }

  function toggleTitleMenu() {
    const titleMenu = document.querySelector('.profile-menu__title');

    if (checkAutorisationStatus()) {
      titleMenu.textContent = `${localStorage.getItem('cardNumber')}`;
      titleMenu.classList.add('profile-menu__title_number');
    } else {
      titleMenu.textContent = 'Profile';
      titleMenu.classList.remove('profile-menu__title_number');
    }
  }

  function changeDigitalCards() {
    const title = document.querySelector('.cards__access-title'),
      discription = document.querySelector('.cards__access-description'),
      btn1 = document.querySelector('.cards__access-sign-up'),
      btn2 = document.querySelector('.cards__access-log-in'),
      btn3 = document.querySelector('.cards__access-profile'),
      valueName = document.querySelector('.search-card__user-name'),
      valueNumber = document.querySelector('.search-card__card-number');
    if (checkAutorisationStatus()) {
      title.textContent = 'Visit your profile';
      discription.textContent =
        'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
      btn1.style.display = 'none';
      btn2.style.display = 'none';
      btn3.style.display = 'block';

      valueName.value = `${localStorage.getItem(
        'firstName'
      )} ${localStorage.getItem('lastName')}`;
      valueNumber.value = `${localStorage.getItem('cardNumber')}`;

      changeCardDecor();
    } else {
      title.textContent = 'Get a reader card';
      discription.textContent =
        'You will be able to see a reader card after logging into account or you can register a new account';
      btn1.style.display = 'block';
      btn2.style.display = 'block';
      btn3.style.display = 'none';

      valueName.value = '';
      valueNumber.value = '';

      changeCardDecor();
    }
  }

  changeDigitalCards();

  const myProfileBtnSecond = document.querySelector('.cards__access-profile');

  myProfileBtnSecond.addEventListener('click', openProfileModal);

  function counterAutorisation() {
    let count = +localStorage.getItem('countAutorisation');
    count += 1;
    localStorage.setItem('countAutorisation', count);
  }

  const profileModal = document.querySelector('.profile-modal'),
    profileCardNumber = document.querySelector('.profile-modal__card-number');

  myProfileBtn.addEventListener('click', openProfileModal);
  myProfileBtn.addEventListener('click', () => {
    menu.classList.remove('profile-menu__active');
  });

  function openProfileModal() {
    profileModal.classList.add('profile-modal_active');
    canvas.classList.add('canvas__show');
    body.classList.add('body-no-scroll');

    const iconProfileModal = document.querySelector('.profile-modal__icon'),
      iconProfileName = document.querySelector('.profile-modal__name'),
      counter = document.querySelector(
        '.profile-modal .search-card__info-count'
      );

    iconProfileModal.textContent = `${localStorage.getItem('firstName')[0]}${
      localStorage.getItem('lastName')[0]
    }`;

    iconProfileName.textContent = `${localStorage.getItem(
      'firstName'
    )} ${localStorage.getItem('lastName')}`;

    counter.textContent = localStorage.getItem('countAutorisation');

    profileCardNumber.textContent = localStorage.getItem('cardNumber');
  }

  function closeProfileModal() {
    profileModal.classList.remove('profile-modal_active');
    canvas.classList.remove('canvas__show');
    body.classList.remove('body-no-scroll');
  }

  closeModalBtn(profileModal);

  const copyBtn = document.querySelector('.profile-modal__icon-copy'),
    selectCardNumber = document.querySelector('.profile-modal__card-number');

  copyBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.value = selectCardNumber.innerText;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);
  });

  function changeCardDecor() {
    const userName = `${localStorage.getItem(
        'firstName'
      )} ${localStorage.getItem('lastName')}`,
      cardNumber = `${localStorage.getItem('cardNumber')}`;

    const valueUserName = document.querySelector('.search-card__user-name'),
      valueCardNumber = document.querySelector('.search-card__card-number');

    if (
      valueUserName.value === userName &&
      valueCardNumber.value === cardNumber
    ) {
      checkCard.style.display = 'none';
      cardInfo.style.display = 'flex';

      const counter = document.querySelector(
        '.search-card .search-card__info-count'
      );

      counter.textContent = localStorage.getItem('countAutorisation');
    }
  }

  checkCard.addEventListener('click', (e) => {
    e.preventDefault();

    if (localStorage.getItem('isRegister') && !checkAutorisationStatus()) {
      changeCardDecor();

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
  });

  logOutBtn.addEventListener('click', changesAfterLogout);
  logOutBtn.addEventListener('click', () => {
    menu.classList.remove('profile-menu__active');
  });

  function changesAfterLogout() {
    localStorage.removeItem('isAutorisation');

    changeIconProfile();
    toogleAttributeTitle();
    toggleTitleMenu();
    changeMenuProfile();
    changeDigitalCards();

    checkCard.style.display = 'block';
    cardInfo.style.display = 'none';
  }

  // Working with buyModal

  // const buyModalForm = document.querySelector('.buy-modal__form'),
  //   buyModalBtn = document.querySelector('.buy-modal__btn'),
  //   buyModalInputs = document.querySelectorAll('.buy-modal__form input');

  // buyModalForm.addEventListener('submit', (e) => {
  //   e.preventDefault();

  //   let filledFields;

  // });
});
