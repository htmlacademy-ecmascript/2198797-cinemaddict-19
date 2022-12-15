import FiltersView from '../view/filters-view.js';
import MenuView from '../view/menu-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import MoviesCounterView from '../view/movies-counter-view';
import ProfileRatingView from '../view/profile-rating-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../render.js';

export default class MoviePresenter {
  filmsListComponent = new FilmsListView();

  constructor({siteBodyElement, siteMainElement, siteHeaderElement, siteFooterElement}) {
    this.siteBodyElement = siteBodyElement;
    this.siteMainElement = siteMainElement;
    this.siteHeaderElement = siteHeaderElement;
    this.siteFooterElement = siteFooterElement;
  }

  init() {
    render(new MenuView, this.siteMainElement);
    render(new FiltersView, this.siteMainElement);
    render(this.filmsListComponent, this.siteMainElement);
    render(new MoviesCounterView, this.siteFooterElement);
    render(new ProfileRatingView, this.siteHeaderElement);

    const filmsContainer = document.querySelector('.films-list__container');
    const filmsList = document.querySelector('.films-list');

    for(let i = 0; i < 5; i++){
      render(new FilmCardView(), filmsContainer);
    }

    render(new ShowMoreButtonView, filmsList);
    render(new PopupView, this.siteBodyElement);
  }
}
