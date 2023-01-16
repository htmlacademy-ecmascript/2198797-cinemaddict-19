import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import MoviesCounterView from '../view/movies-counter-view';
import ProfileRatingView from '../view/profile-rating-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import PopupPresenter from './popup-presenter.js';
import MenuPresenter from './menu-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';
import { SortType } from '../const.js';
import {sortByDate, sortByRating} from '../utils.js';

const FILMS_NUMBER_PER_STEP = 5;

export default class BoardPresenter {
  #siteBodyElement = null;
  #siteMainElement = null;
  #siteHeaderElement = null;
  #siteFooterElement = null;
  #filmsModel = null;

  #filmPresentorCollection = [];
  #menuPresenter = null;
  #popupPresenter = null;
  #showMoreButtonPresenter = null;

  #filmsListComponent = new FilmsListView();
  #filmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
  #filmsList = this.#filmsListComponent.element.querySelector('.films-list');

  #loadedFilms = [];
  #loadedComments = null;
  #userToFilmMap = null;
  #sourceFilmList = [];
  #currentSortType = SortType.DEFAULT;

  #renderFilmCount = 0;


  constructor({siteBodyElement, siteMainElement, siteHeaderElement, siteFooterElement, filmsModel}) {
    this.#siteBodyElement = siteBodyElement;
    this.#siteMainElement = siteMainElement;
    this.#siteHeaderElement = siteHeaderElement;
    this.#siteFooterElement = siteFooterElement;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#loadedFilms = [...this.#filmsModel.films];
    this.#sourceFilmList = [...this.#filmsModel.films];
    this.#loadedComments = this.#filmsModel.comments;
    this.#userToFilmMap = this.#filmsModel.userToFilmMap;

    this.#renderBoard();
  }

  #renderFilm = () => {
    this.#loadedFilms
      .slice(this.#renderFilmCount, this.#renderFilmCount + FILMS_NUMBER_PER_STEP)
      .forEach((film) => {
        this.#filmPresentorCollection.push(new FilmPresenter({
          filmsContainer: this.#filmsContainer,
          openPopupHendler: this.#openPopupHandler,
          updateUserToFilmMapHandler: this.#updateUserToFilmMapHandler
        }));
        this.#filmPresentorCollection[this.#filmPresentorCollection.length - 1].init(film, this.#userToFilmMap.get(film.id));
      });
    this.#renderFilmCount += FILMS_NUMBER_PER_STEP;
  };

  #showMoreButtonClickHandler = () => {
    this.#renderFilm();
    if (this.#renderFilmCount >= this.#loadedFilms.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  #openPopupHandler = (film, dataMap) => {
    if(this.#popupPresenter !== null ){
      return;
    }
    this.#popupPresenter = new PopupPresenter({
      siteBodyElement: this.#siteBodyElement,
      updateUserToFilmMapHandler: this.#updateUserToFilmMapHandler,
      closePopupHandler: this.#closePopupHandler,
    });
    const tmpComments = [];
    for(let i = 0; i < film.comments.length; i++){
      tmpComments.push(this.#loadedComments[film.comments[i]]);
    }
    this.#popupPresenter.init(film, dataMap, tmpComments);
  };

  #closePopupHandler = () => {
    this.#popupPresenter = null;
  };

  #updateUserToFilmMapHandler = (film, dataMap) => {
    this.#userToFilmMap.delete(film.id);
    this.#userToFilmMap.set(film.id, dataMap);
    this.#menuPresenter.init(this.#userToFilmMap);
    this.#filmPresentorCollection.find((element) => {
      if(element.getId() === film.id){
        element.init(film, this.#userToFilmMap.get(film.id));
      }
    });
  };

  #renderMenuView = () => {
    this.#menuPresenter = new MenuPresenter({menuContainer: this.#siteMainElement});
    this.#menuPresenter.init(this.#userToFilmMap);
  };

  #renderProfileRatingView = () => {
    let rating = 0;
    let profileRating = null;
    this.#userToFilmMap.forEach((element) => element.isWatched ? rating++ : rating);
    if(rating > 0){
      profileRating = 'Novice';
    }
    if(rating > 10){
      profileRating = 'Fan';
    }
    if(rating > 20){
      profileRating = 'Movie Buff';
    }
    render(new ProfileRatingView({profileRating: profileRating}), this.#siteHeaderElement);
  };

  #renderShowMoreButton = () => {
    if (this.#loadedFilms.length > FILMS_NUMBER_PER_STEP) {
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter({
        showMoreButtonContainer: this.#filmsList,
        showMoreButtonClickHandler: this.#showMoreButtonClickHandler,
      });
      this.#showMoreButtonPresenter.init();
    }
    if(this.#loadedFilms.length === 0){
      render(new EmptyListView, this.#filmsList);
    }
  };

  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this.#loadedFilms.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this.#loadedFilms.sort(sortByRating);
        break;
      default:
        this.#loadedFilms = [...this.#sourceFilmList];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTasks(sortType);
    this.#clearFilmList();
    this.#renderFilm();
    this.#renderShowMoreButton();
  };

  #clearFilmList() {
    this.#filmPresentorCollection.forEach((presenter) => presenter.destroy());
    this.#filmPresentorCollection = [];
    this.#renderFilmCount = 0;
    this.#showMoreButtonPresenter.destroy();
  }

  #renderSortView = () => {
    render(new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    }), this.#siteMainElement);
  };

  #renderBoard(){
    this.#renderMenuView();
    this.#renderSortView();
    render(this.#filmsListComponent, this.#siteMainElement);
    render(new MoviesCounterView({filmsCount: this.#filmsModel.getFilmsCount()}), this.#siteFooterElement);
    this.#renderProfileRatingView();
    this.#renderFilm();
    this.#renderShowMoreButton();
  }
}

