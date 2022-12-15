import MoviePresenter from './presenter/movie-presenter.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = siteBodyElement.querySelector('.footer__statistics');

const moviePresenter = new MoviePresenter({ siteBodyElement: siteBodyElement,
  siteMainElement: siteMainElement,
  siteHeaderElement: siteHeaderElement,
  siteFooterElement: siteFooterElement});

moviePresenter.init();
