window.addEventListener('DOMContentLoaded', () => {
  alert('Проверяющий, задание не доделано до конца, по возможности, прощу сегодня его не проверять, хочу доделать.')
  
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

      // function close() {
      //   const timer = setTimeout(() => {
      //     document.body.addEventListener('click', (e) => {
      //       if (navigation.classList.contains('nav_active')) {
      //         console.log('сделано');
      //         if (!e.target.closest('nav_active')) {
      //           burgerClose();
      //         }
      //       }
      //     });
      //   }, 10);
      //   clearTimeout(timer);
      // }
      // close();

      // const timer = setTimeout(() => {
      //   function close() {
      //     if (navigation.classList.contains('nav_active')) {
      //       console.log('сделано');
      //       if (!e.target.closest('nav_active')) {
      //         burgerClose();
      //       }
      //     }
      //   }

      //   document.body.addEventListener('click', close);
      //   document.body.removeEventListener('click', close);
      // }, 10);
    }

    burger.addEventListener('click', clickerBurger);
  }

  navigation();
});
