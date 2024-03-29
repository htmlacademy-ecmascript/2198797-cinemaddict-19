import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import MoviesCounterView from '../view/movies-counter-view';
import ProfileRatingView from '../view/profile-rating-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import {render, remove} from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import PopupPresenter from './popup-presenter.js';
import FilterPresenter from './filter-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter.js';
import { SortType, UserAction, UpdateType} from '../const.js';
import {sortByDate, sortByRating} from '../utils.js';
import {filter} from '../utils/filter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ExtraPresenter from './extra-presenter.js';

const FILMS_NUMBER_PER_STEP = 5;

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #siteBodyElement = null;
  #siteMainElement = null;
  #siteHeaderElement = null;
  #siteFooterElement = null;
  #filmsModel = null;
  #filtersModel = null;

  #filmPresentorCollection = [];
  #filterPresenter = null;
  #extraPresenter = null;
  #popupPresenter = null;
  #showMoreButtonPresenter = null;
  #filterType = null;

  #filmsListComponent = new FilmsListView();
  #loadingComponent = new LoadingView();
  #filmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
  #filmsList = this.#filmsListComponent.element.querySelector('.films-list');
  #sortView = null;
  #emptyListView = null;

  #userToFilmMap = null;
  #currentSortType = SortType.DEFAULT;

  #renderFilmCount = 0;
  #isLoading = true;


  constructor({siteBodyElement, siteMainElement, siteHeaderElement, siteFooterElement, filmsModel, filtersModel}) {
    this.#siteBodyElement = siteBodyElement;
    this.#siteMainElement = siteMainElement;
    this.#siteHeaderElement = siteHeaderElement;
    this.#siteFooterElement = siteFooterElement;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get films(){
    this.#filterType = this.#filtersModel.filter;
    const films = [...this.#filmsModel.films];
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }
    return filteredFilms;
  }

  get userToFilmMap() {
    return this.#filmsModel.userToFilmMap;
  }

  #getRawFilms(){
    const films = [...this.#filmsModel.films];
    return films;
  }

  #renderFilm = (film) => {
    this.#filmPresentorCollection.push(new FilmPresenter({
      filmsContainer: this.#filmsContainer,
      openPopupHendler: this.#openPopupHandler,
      updateUserToFilmMapHandler: this.#handleViewAction
    }));
    this.#filmPresentorCollection[this.#filmPresentorCollection.length - 1].init(film);
  };

  #showMoreButtonClickHandler = () => {
    this.#renderFilms();
    if (this.#renderFilmCount >= this.films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  #openPopupHandler = (film) => {
    if(this.#popupPresenter !== null ){
      return;
    }
    this.#popupPresenter = new PopupPresenter({
      siteBodyElement: this.#siteBodyElement,
      updateFilmDetails: this.#handleViewAction,
      closePopupHandler: this.#closePopupHandler,
    });
    this.#filmsModel.getComments(film.id).then((value) => this.#popupPresenter.init(film, value));
  };

  #closePopupHandler = () => {
    this.#popupPresenter = null;
  };

  #renderMenuView = () => {
    this.#filterPresenter = new FilterPresenter({filterContainer: this.#siteMainElement, filtersModel: this.#filtersModel, filmsModel: this.#filmsModel});
    this.#filterPresenter.init(this.#userToFilmMap);
  };

  #renderProfileRatingView = () => {
    let rating = 0;
    let profileRating = null;
    this.films.forEach((element) => element.userDetails.isWatched ? rating++ : rating);
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
    if (this.films.length > FILMS_NUMBER_PER_STEP) {
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter({
        showMoreButtonContainer: this.#filmsList,
        showMoreButtonClickHandler: this.#showMoreButtonClickHandler,
      });
      this.#showMoreButtonPresenter.init();
      if(this.#emptyListView !== null){
        remove(this.#emptyListView);
      }
    }
    if(this.films.length === 0){
      if(this.#emptyListView === null){
        this.#emptyListView = new EmptyListView();
      }
      render(this.#emptyListView, this.#filmsList);
    }
  };

  #clearFilmList() {
    this.#filmPresentorCollection.forEach((presenter) => presenter.destroy());
    this.#filmPresentorCollection = [];
    this.#renderFilmCount = 0;
    this.#showMoreButtonPresenter.destroy();
  }

  #renderSortView = () => {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleViewAction,
    });
    render(this.#sortView, this.#siteMainElement);
    this.#sortView.setActiveSortType(SortType.DEFAULT);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_FILM_DETAILS:
        try{
          await this.#filmsModel.updateFilmDetails(updateType, update);
        } catch(err) {
          if(this.#popupPresenter !== null){
            this.#popupPresenter.setAborting(UserAction.UPDATE_FILM_DETAILS);
          }
          this.#filmPresentorCollection.find((element) => {
            if(element.getId() === update.film.id){
              element.setAborting();
            }
          });
          this.#extraPresenter.setAborting(update.film.id);
        }
        break;
      case UserAction.UPDATE_SORT_VIEW:
        if (this.#currentSortType === update) {
          return;
        }
        this.#currentSortType = update;
        this.#handleModelEvent(updateType, {});
        break;
      case UserAction.ADD_COMMENT:
        update.actionType = actionType;
        try{
          await this.#filmsModel.addComment(updateType, update);
        }catch(err){
          this.#popupPresenter.setAborting(UserAction.ADD_COMMENT);
        }
        break;
      case UserAction.DELETE_COMMENT:
        update.actionType = actionType;
        try{
          await this.#filmsModel.deleteComment(updateType, update);
        }catch(err){
          this.#popupPresenter.setAborting(UserAction.DELETE_COMMENT);
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filterPresenter.init();
        this.#filmPresentorCollection.find((element) => {
          if(element.getId() === data.film.id){
            element.init(data.film);
          }
        });
        this.#renderExtra();
        if(this.#popupPresenter !== null ){
          this.#popupPresenter.updatePopupView(data);
        }
        break;
      case UpdateType.MINOR:
        this.#clearFilmList();
        this.#renderFilms();
        this.#renderShowMoreButton();
        this.#renderExtra();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmList();
        this.#renderFilms();
        this.#renderShowMoreButton();
        this.#currentSortType = SortType.DEFAULT;
        this.#sortView.setActiveSortType(SortType.DEFAULT);
        this.#renderExtra();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderFilms(){
    const films = this.films;
    const filmCount = films.length;

    const newRenderedFilmCount = Math.min(filmCount, this.#renderFilmCount + FILMS_NUMBER_PER_STEP);
    const slicedFilms = this.films.slice(this.#renderFilmCount, newRenderedFilmCount);
    slicedFilms.forEach((film) => this.#renderFilm(film));
    this.#renderFilmCount = newRenderedFilmCount;


  }

  #renderLoading() {
    render(this.#loadingComponent, this.#filmsList);
  }

  #renderExtra() {
    this.#extraPresenter.init(this.#getRawFilms());
  }

  #renderBoard(){
    render(this.#filmsListComponent, this.#siteMainElement);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderMenuView();
    this.#renderSortView();
    render(this.#filmsListComponent, this.#siteMainElement);
    render(new MoviesCounterView({filmsCount: this.#filmsModel.getFilmsCount()}), this.#siteFooterElement);
    this.#renderProfileRatingView();
    this.#renderFilms();
    this.#renderShowMoreButton();
    this.#extraPresenter = new ExtraPresenter({
      filmsContainer: this.#filmsListComponent.element,
      openPopupHendler: this.#openPopupHandler,
      updateUserToFilmMapHandler: this.#handleViewAction
    });
    this.#renderExtra();
  }
}

