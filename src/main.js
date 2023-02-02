import BoardPresenter from './presenter/board-presenter.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = siteBodyElement.querySelector('.footer__statistics');
import FilmsModel from './model/films-model.js';
import FiltersModel from './model/filters-model.js';
import FilmApiService from './film-api-service.js';

const AUTHORIZATION = 'Basic c2h5ohnew1';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const filmsModel = new FilmsModel({filmApiService: new FilmApiService(END_POINT, AUTHORIZATION)});
filmsModel.init();
const filtersModel = new FiltersModel();

const boardPresenter = new BoardPresenter({siteBodyElement,
  siteMainElement,
  siteHeaderElement,
  siteFooterElement,
  filmsModel,
  filtersModel
});

boardPresenter.init();
