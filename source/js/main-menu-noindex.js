const menuButton = document.querySelector('.page-header-noindex__toggle');
const navContainer = document.querySelector('.page-header-noindex__nav-container');

menuButton.addEventListener ('click', function (evt) {
  evt.preventDefault();
  if (menuButton.classList.contains('page-header-noindex__toggle--open')) {
    menuButton.classList.remove('page-header-noindex__toggle--open');
    menuButton.classList.add('page-header-noindex__toggle--close');
    navContainer.classList.remove('page-header-noindex__nav-container--close');
  } else {
    menuButton.classList.remove('page-header-noindex__toggle--close');
    menuButton.classList.add('page-header-noindex__toggle--open');
    navContainer.classList.add('page-header-noindex__nav-container--close');
  }
});
