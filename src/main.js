import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import MenuView from './view/menu-view.js';
import ProfileRatingView from './view/profile-rating-view.js';
import FilmsListView from './view/films-list-view';
import MoviesCounterView from './view/movies-counter-view';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');


render(new ProfileRatingView, siteHeaderElement);
render(new MenuView, siteMainElement);
render(new FiltersView, siteMainElement);
render(new FilmsListView, siteMainElement);
render(new MoviesCounterView,siteFooterElement);
