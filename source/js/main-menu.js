const menuButton = document.querySelector('.page-header__toggle');
const navContainer = document.querySelector('.page-header__nav-container');

menuButton.addEventListener ('click', function (evt) {
  evt.preventDefault();
  if (menuButton.classList.contains('page-header__toggle--open')) {
    menuButton.classList.remove('page-header__toggle--open');
    menuButton.classList.add('page-header__toggle--close');
    navContainer.classList.remove('page-header__nav-container--close');
  } else {
    menuButton.classList.remove('page-header__toggle--close');
    menuButton.classList.add('page-header__toggle--open');
    navContainer.classList.add('page-header__nav-container--close');
  }
});
