import BoardPresenter from './presenter/board-presenter.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = siteBodyElement.querySelector('.footer__statistics');
import FilmsModel from './model/films-model.js';

const filmsModel = new FilmsModel();
const moviePresenter = new BoardPresenter({siteBodyElement,
  siteMainElement,
  siteHeaderElement,
  siteFooterElement,
  filmsModel
});

moviePresenter.init();
