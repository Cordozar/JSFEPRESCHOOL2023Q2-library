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
});
